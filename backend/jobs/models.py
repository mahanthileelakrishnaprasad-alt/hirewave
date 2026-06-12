from django.db import models

class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    ]
    CATEGORY_CHOICES = [
        ('engineering', 'Engineering'),
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('sales', 'Sales'),
        ('finance', 'Finance'),
        ('hr', 'Human Resources'),
        ('operations', 'Operations'),
        ('data', 'Data & Analytics'),
        ('product', 'Product'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_logo = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=200)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full-time')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='engineering')
    description = models.TextField()
    requirements = models.TextField()
    salary_min = models.IntegerField(null=True, blank=True)
    salary_max = models.IntegerField(null=True, blank=True)
    salary_currency = models.CharField(max_length=10, default='INR')
    experience_years = models.IntegerField(default=0)
    skills = models.JSONField(default=list)
    apply_url = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    posted_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-is_featured', '-posted_at']

    def __str__(self):
        return f"{self.title} at {self.company}"