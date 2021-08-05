from django.urls import path
from base.views.user_views import get_users, get_userProfile, registerUser, MyTokenObtainPairView, updateUserProfile,getUserById,updateUser,deleteUser

urlpatterns = [
    path('', get_users, name='user_list'),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', get_userProfile, name='user_profile'),
    path('profile/update/', updateUserProfile, name="user_profile_update"),
    path('register/', registerUser, name='register_user'),
    path('<str:pk>/', getUserById, name='user'),

    path('update/<str:pk>/', updateUser, name='user-update'),

    path('delete/<str:pk>/', deleteUser, name='user-delete'),
]
