from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth

# Create your views here.
def login(request):
    if request.method == "POST":
        Email = str(request.POST['Email'])
        username = ""
        if User.objects.filter(email = Email).exists():
            username = User.objects.get(email=Email).username
        password = request.POST['password']
        user = auth.authenticate(username= username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect("/Accounts/afterlogin")
        else:
            messages.info(request,"invalid credentials")
            return redirect('/Accounts/Login')
    else:
        if request.user.is_authenticated:
            return redirect("/Accounts/afterlogin")
        return render(request,'login/index.html')

def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        if User.objects.filter(username=username).exists():
            messages.info(request,"Username taken")
            return redirect('/Accounts/Signup')
        if User.objects.filter(email=email).exists():
            messages.info(request,"User already has an account")
            return redirect('/Accounts/Signup')
        if password1!=password2:
            messages.info(request,"Password does not match")
            return redirect('/Accounts/Signup')
        user = User.objects.create_user(username = username, email= email, password= password1)
        user.save()
        return redirect('/Accounts/aftersignup')
    else:
        if request.user.is_authenticated:
            return redirect("/Accounts/afterlogin")
        return render(request,'signup/index.html')

def afterlogin(request):
    return render(request,'login/afterlogin.html')

def logout(request):
    auth.logout(request)
    return redirect('/Accounts/Login')

def aftersignup(request):
    return render(request,'signup/aftersignup.html')