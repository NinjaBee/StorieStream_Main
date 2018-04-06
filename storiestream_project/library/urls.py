from django.urls import url
from . import views

app_name = 'library'
urlpatterns = [
    path('', views.index, name='index')
]