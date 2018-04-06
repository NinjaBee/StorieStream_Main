from django.urls import url
from . import views

app_name = 'users'
urlpatterns = [
    path('', views.index, name='index')
]