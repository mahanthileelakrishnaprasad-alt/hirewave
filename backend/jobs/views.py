from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Job
from .serializers import JobListSerializer, JobDetailSerializer, JobCreateSerializer

class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'company', 'location', 'skills']
    ordering_fields = ['posted_at', 'salary_min', 'experience_years']

    def get_queryset(self):
        queryset = Job.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        job_type = self.request.query_params.get('job_type')
        location = self.request.query_params.get('location')
        featured = self.request.query_params.get('featured')

        if category:
            queryset = queryset.filter(category=category)
        if job_type:
            queryset = queryset.filter(job_type=job_type)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        return queryset

class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobDetailSerializer

class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobCreateSerializer

@api_view(['GET'])
def job_stats(request):
    total = Job.objects.filter(is_active=True).count()
    by_category = {}
    for cat_key, cat_label in Job.CATEGORY_CHOICES:
        count = Job.objects.filter(is_active=True, category=cat_key).count()
        if count > 0:
            by_category[cat_label] = count
    by_type = {}
    for type_key, type_label in Job.JOB_TYPE_CHOICES:
        count = Job.objects.filter(is_active=True, job_type=type_key).count()
        if count > 0:
            by_type[type_label] = count
    return Response({
        'total_jobs': total,
        'by_category': by_category,
        'by_type': by_type,
    })