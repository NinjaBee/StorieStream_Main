from django.urls import path, url
from . import views

app_name = 'edits'
urlpatterns = [
    path('', views.index, name='index')
]