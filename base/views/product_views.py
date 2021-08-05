from django.core import paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product,Review,Category
from base.serializers import ProductSerializer,CategorySerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework import status
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator


@api_view(['GET'])
def get_products(request):
    category=request.query_params.get('category')
    if category:
        products = Category.objects.get(_id=category).product_set.all()
    else:
        query = request.query_params.get('keyword')
        if query == None:
            query = ''
        products = Product.objects.filter(name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator=Paginator(products,2)

    try:
        products=paginator.page(page)
    except PageNotAnInteger:
        products=paginator.page(1)
    except EmptyPage:
        products=paginator.page(paginator.num_pages)

    if page == None:
        page=1

    page=int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data,'page':page,'pages':paginator.num_pages})


@api_view(['GET'])
def get_product(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_categories(request):
    categories =Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.all().order_by('-rating')[0:8]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    
    try:
        product = Product.objects.get(_id=pk)
    except:
        content = {'detail': "This product doesn't exist"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
    data = request.data

    # 0 - Did this user bought Product
    itemBuy=user.orderitem_set.all().filter(product=product).exists()
    if not itemBuy:
        content = {'detail': "You have to buy the product in order to write a review."}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        review.save()

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


