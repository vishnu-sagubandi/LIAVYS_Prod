from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from django.utils import timezone
import braintree

# Create your views here.
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id='g3gp36w5ygfxd7jg',
        public_key='973gkwbqfssmhjgn',
        private_key='19e4af46e62a69b599c99130cfe8e68d'
    )
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTokenView(request):
    return Response({'clientToken': gateway.client_token.generate()})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    try:
        orderItems = data['orderItems']
        if (not orderItems) or len(orderItems) == 0:
            return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            state=data['shippingAddress']['state'],
            name=data['shippingAddress']['name'],
            phone=data['shippingAddress']['phone'],
            shippingPrice=data['shippingPrice'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                user=user,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if order.isPaid == True:
            return Response({'detail': 'Order was paid already'}, status=status.HTTP_400_BAD_REQUEST)

        if ((not user.is_staff) or (not (order.user == user))):
            return Response({'detail': 'You are not authorized to pay this order'}, status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]

    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })

    if result.is_success:
        order = Order.objects.get(_id=pk)
        order.isPaid = result.is_success
        order.paidAt =timezone.now()
        order.transaction_id = result.transaction.id
        order.paymentMethod=result.transaction.payment_instrument_type
        order.save()
        return Response("Order is Paid. Please refresh the page if it is not reflecting")

    else:
        return Response({'detail': 'Something error occured'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()

    return Response('Order was delivered')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all().order_by('-createdAt')
    if not orders.exists():
        return Response({'detail': 'No orders available yet'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)