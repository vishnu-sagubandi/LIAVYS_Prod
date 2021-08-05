from django.urls import path
from base.views.herosec_views import get_heroSec, get_all_heroSec

urlpatterns = [

    path('', get_all_heroSec, name="herosection"),
    path('<str:pk>/', get_heroSec, name="herosection"),

]
