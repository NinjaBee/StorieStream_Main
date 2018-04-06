from django.urls import url
from . import views

app_name = 'curves'
urlpatterns = [
    path('', views.index, name='index')
]