from django.shortcuts import render

# Create your views here.
def login(request):
    return render(request,'login/index.html')

def signup(request):
    return render(request,'signup/index.html')