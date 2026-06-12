from django.test import TestCase
from rest_framework.test import APIClient
from .models import Job
from datetime import date, timedelta

class JobAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.job = Job.objects.create(
            title="Test Python Developer",
            company="TestCo",
            location="Hyderabad",
            job_type="full-time",
            category="engineering",
            description="Test description for a Python developer role.",
            requirements="Python, Django",
            salary_min=500000,
            salary_max=900000,
            experience_years=2,
            skills=["Python", "Django"],
            is_active=True,
        )

    def test_list_jobs_returns_200(self):
        response = self.client.get('/api/jobs/')
        self.assertEqual(response.status_code, 200)

    def test_list_jobs_contains_seeded_job(self):
        response = self.client.get('/api/jobs/')
        titles = [j['title'] for j in response.data['results']]
        self.assertIn('Test Python Developer', titles)

    def test_job_detail_returns_200(self):
        response = self.client.get(f'/api/jobs/{self.job.id}/')
        self.assertEqual(response.status_code, 200)

    def test_job_detail_404_for_missing(self):
        response = self.client.get('/api/jobs/99999/')
        self.assertEqual(response.status_code, 404)

    def test_search_by_title(self):
        response = self.client.get('/api/jobs/?search=Python')
        self.assertEqual(response.status_code, 200)
        self.assertGreater(response.data['count'], 0)

    def test_filter_by_category(self):
        response = self.client.get('/api/jobs/?category=engineering')
        self.assertEqual(response.status_code, 200)

    def test_filter_by_job_type(self):
        response = self.client.get('/api/jobs/?job_type=full-time')
        self.assertEqual(response.status_code, 200)

    def test_stats_endpoint(self):
        response = self.client.get('/api/jobs/stats/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('total_jobs', response.data)

    def test_create_job(self):
        data = {
            "title": "New Role", "company": "NewCo",
            "location": "Remote", "job_type": "remote",
            "category": "engineering",
            "description": "A great new role.",
            "requirements": "3+ years experience",
            "experience_years": 3,
            "skills": ["Python", "React"],
        }
        response = self.client.post('/api/jobs/post/', data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_inactive_jobs_not_listed(self):
        self.job.is_active = False
        self.job.save()
        response = self.client.get('/api/jobs/')
        titles = [j['title'] for j in response.data['results']]
        self.assertNotIn('Test Python Developer', titles)