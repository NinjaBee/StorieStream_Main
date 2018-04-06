from django.urls import url
from . import views

app_name = 'curves'
urlpatterns = [
    path('./templates/', views.index, name='index')
]