from django.urls import path
from base.views.product_views import get_product, get_products,createProductReview,getTopProducts,deleteProduct,get_categories

urlpatterns = [
    path('', get_products, name="products"),
    path('catlist/',get_categories,name="category-list"),
    path('top/',getTopProducts,name='top-products'),
    path('<str:pk>/', get_product, name="product"),
    path('delete/<str:pk>/',deleteProduct,name="delete-product"),
    path('<str:pk>/reviews/', createProductReview, name='add-review'),
]
