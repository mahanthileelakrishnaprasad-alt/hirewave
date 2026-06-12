from rest_framework import serializers
from .models import Job

class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'company_logo', 'location',
            'job_type', 'category', 'salary_min', 'salary_max',
            'salary_currency', 'experience_years', 'skills',
            'is_featured', 'posted_at', 'deadline'
        ]

class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'title', 'company', 'company_logo', 'location',
            'job_type', 'category', 'description', 'requirements',
            'salary_min', 'salary_max', 'salary_currency',
            'experience_years', 'skills', 'apply_url', 'deadline'
        ]