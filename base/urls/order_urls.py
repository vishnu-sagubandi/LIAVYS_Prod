from django.urls import path
from base.views.order_views import *

urlpatterns = [
    path('', getOrders, name='orders'),
    path('add/', addOrderItems, name='orders-add'),
    path('gettoken/', getTokenView, name='get-client-token'),
    path('myorders/', getMyOrders, name='myorders'),
    path('<str:pk>/', getOrderById, name='get-order-by-id'),
    path('<str:pk>/deliver/', updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/pay/', updateOrderToPaid, name='pay'),
]
