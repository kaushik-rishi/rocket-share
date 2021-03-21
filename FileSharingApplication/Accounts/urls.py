from django.urls import path
from . import views

urlpatterns = [
    path('',views.login,name="home"),
    path('/Login',views.login,name="login"),
    path('/Signup',views.signup,name="register"),
    path('/afterlogin',views.afterlogin,name="loggedin"),
    path('/logout',views.logout,name="logout")
]