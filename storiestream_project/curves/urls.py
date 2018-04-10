from django.urls import path
from . import views

app_name = 'curves'
urlpatterns = [
    path('./static/', views.index, name='index')
]