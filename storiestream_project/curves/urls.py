from django.urls import url
from . import views

app_name = 'curves'
urlpatterns = [
    path('./static/', views.index, name='index')
]