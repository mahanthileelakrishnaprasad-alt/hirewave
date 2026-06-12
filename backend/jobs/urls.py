from django.urls import path
from . import views

urlpatterns = [
    path('', views.JobListView.as_view(), name='job-list'),
    path('stats/', views.job_stats, name='job-stats'),
    path('<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
    path('post/', views.JobCreateView.as_view(), name='job-create'),
]