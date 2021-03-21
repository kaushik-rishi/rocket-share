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
            print("not found")
            messages.info(request,"invalid credentials")
            return redirect('/Accounts/Login')
    else:
        if request.user.is_authenticated:
            return redirect("/Accounts/afterlogin")
        return render(request,'login/index.html')

def signup(request):
    return render(request,'signup/index.html')

def afterlogin(request):
    return render(request,'login/afterlogin.html')

def logout(request):
    auth.logout(request)
    return redirect('/Accounts/Login')