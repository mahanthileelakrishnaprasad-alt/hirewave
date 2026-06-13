  HireWave  
Full-Stack Job Board Platform
Technical Documentation
Built by Mahanthi Leela Krishna Prasad  |  June 2026

1. Project Overview
HireWave is a modern full-stack job board platform that connects job seekers with employers. Built using Django REST Framework for the backend API and React (Vite) for the frontend, it provides a seamless experience for browsing, searching, filtering, and posting job listings.
Live Links
🌐 Frontend (Live Demo)
⚙️ Backend API
📁 GitHub Repository

2. Tech Stack
Backend
Technology	Version	Purpose
Python	3.11	Core programming language
Django	4.2.7	Web framework
Django REST Framework	3.14.0	REST API layer
django-cors-headers	4.3.1	Cross-origin request handling
WhiteNoise	6.6.0	Static file serving
Gunicorn	21.2.0	Production WSGI server
SQLite	Built-in	Database (development & production)

Frontend
Technology	Version	Purpose
React	18.x	UI library
Vite	5.x	Build tool & dev server
React Router	v6	Client-side routing
Axios	Latest	HTTP client for API calls
Lucide React	Latest	Icon library

DevOps & Deployment
Tool	Purpose
GitHub	Version control & source code hosting
GitHub Actions	CI/CD pipeline automation
Render (Backend)	Django REST API hosting
Render (Frontend)	React static site hosting

3. Project Structure
hirewave/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD pipeline
├── backend/                   # Django project
│   ├── config/
│   │   ├── settings.py        # Django configuration
│   │   ├── urls.py            # Root URL routing
│   │   └── wsgi.py            # WSGI entry point
│   ├── jobs/
│   │   ├── models.py          # Job database model
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   ├── urls.py            # App URL config
│   │   ├── tests.py           # Unit tests (10 tests)
│   │   └── management/commands/seed_jobs.py
│   ├── requirements.txt
│   └── Procfile
└── frontend/                  # React + Vite
    ├── src/
    │   ├── components/        # Navbar, JobCard
    │   ├── pages/             # Home, JobDetail, PostJob, Bookmarks
    │   ├── hooks/             # useBookmarks
    │   ├── api.js             # Axios API client
    │   └── App.jsx            # Router + layout
    └── vercel.json

4. Features
4.1 Job Listings Page
The main landing page displays all active job listings in a responsive grid layout.
●	Paginated grid of job cards (10 per page)
●	Hero section with live job count statistics
●	Skeleton loaders shown while data is fetching
●	Stats bar showing count by job type (Full Time, Remote, Internship)
●	Responsive design works on mobile, tablet, and desktop
4.2 Search & Filter
Users can search and filter jobs in real time without page reloads.
●	Full-text search across job title, company, location, and skills
●	Filter by category: Engineering, Design, Marketing, Sales, Finance, HR, Data, Product
●	Filter by job type: Full-time, Part-time, Contract, Internship, Remote
●	Filter by location (partial match)
●	Clear all filters with one click
●	Active filter count shown on the Filters button
4.3 Job Detail Page
Clicking any job card opens a full detail view with all job information.
●	Company logo, name, job title, and featured badge
●	Meta information: location, job type, salary range, experience, deadline
●	Skills tags displayed visually
●	Full job description and requirements
●	Apply Now button (links to external apply URL if provided)
●	Save/Bookmark toggle button
●	Back to listings navigation
4.4 Post a Job
Employers can post new job listings through a comprehensive form.
●	Fields: title, company, location, logo URL, job type, category
●	Salary range (min/max) in INR
●	Experience years, application deadline, apply URL
●	Skills tag input — type and press Enter or click Add
●	Full description and requirements text areas
●	Form validation with error messages
●	Success confirmation screen after posting
4.5 Bookmark / Save Jobs
Job seekers can save jobs they are interested in for later review.
●	Bookmark icon on every job card and detail page
●	Bookmarks stored in browser localStorage — persists across sessions
●	Dedicated Saved Jobs page accessible from navbar
●	Bookmark count shown in navbar
●	Toggle bookmark on/off with single click
4.6 Featured Jobs
Premium job listings are visually highlighted throughout the platform.
●	Featured badge with star icon on job cards
●	Purple left border on featured job cards
●	Featured roles sorted first in listings

5. API Reference
Base URL: https://hirewave-backend-8h0a.onrender.com/api
GET /jobs/
Returns a paginated list of all active job listings.
Parameter	Type	Description
search	string	Full-text search across title, company, skills
category	string	Filter by category slug (e.g. engineering)
job_type	string	Filter by type (full-time, remote, contract)
location	string	Filter by location (partial match)
featured	boolean	Show only featured jobs (true/false)
page	integer	Page number, default 1, page size 10

GET /jobs/<id>/
Returns full details for a single job by its ID.
POST /jobs/post/
Creates a new job listing. Required fields: title, company, location, description, requirements, job_type, category.
GET /jobs/stats/
Returns aggregate statistics — total job count, breakdown by category and job type.

6. CI/CD Pipeline
The GitHub Actions workflow (ci-cd.yml) automatically runs on every push to the main branch.
Job	Steps	Trigger
backend-test	Install deps → Django check → Migrate → Run 10 tests	Every push
frontend-build	Install deps → npm run build → Upload dist artifact	Every push
deploy-render-backend	Trigger Render backend redeploy via API webhook	Push to main only
deploy-render-frontend	Trigger Render frontend redeploy via API webhook	Push to main only

7. Testing
10 unit tests written using Django's built-in test framework and DRF's APIClient.
Test Name	What it tests
test_list_jobs_returns_200	Job list endpoint returns HTTP 200
test_list_jobs_contains_seeded_job	Seeded jobs appear in listing
test_job_detail_returns_200	Job detail endpoint returns correct job
test_job_detail_404_for_missing	Returns 404 for non-existent job ID
test_search_by_title	Search parameter filters results correctly
test_filter_by_category	Category filter returns correct results
test_filter_by_job_type	Job type filter returns correct results
test_stats_endpoint	Stats endpoint returns total_jobs and by_category
test_create_job	POST /jobs/post/ creates a new job (201)
test_inactive_jobs_not_listed	Inactive jobs are excluded from listings

Run tests locally:
cd backend && python manage.py test jobs --verbosity=2

8. Deployment Guide
Backend — Render
Setting	Value
Service Type	Web Service
Root Directory	backend
Environment	Python 3.11
Build Command	pip install -r requirements.txt && python manage.py migrate && python manage.py seed_jobs
Start Command	gunicorn config.wsgi:application
Environment Variables	SECRET_KEY, DEBUG=False

Frontend — Render
Setting	Value
Service Type	Static Site
Root Directory	frontend
Build Command	npm install && npm run build
Publish Directory	dist
Environment Variables	VITE_API_URL=https://hirewave-backend-8h0a.onrender.com/api

9. Local Setup
Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_jobs
python manage.py runserver
API available at: http://localhost:8000/api/jobs/
Frontend
cd frontend
npm install
# Create .env file with:
VITE_API_URL=http://localhost:8000/api
npm run dev
App available at: http://localhost:5173

Built by Mahanthi Leela Krishna Prasad
Python Full-Stack Developer | Hyderabad, Telangana
Assessment Submission — Globalco Software Engineer Position | June 2026
