from django.urls import path
from . import views

app_name = 'edits'
urlpatterns = [
    path('', views.index, name='index'),
    path('storieForm/', views.edit_storie, name='edit'),
    path('<int:pk>/', views.detail, name='detail'),
]

