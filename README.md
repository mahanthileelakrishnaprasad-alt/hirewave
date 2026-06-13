# HireWave — Full-Stack Job Board Platform

> A modern job board built with **Django REST Framework** + **React (Vite)**, featuring real-time search, category filtering, job bookmarking, post a job form, and a complete CI/CD pipeline deployed on Render.

---

## 🔗 Live Links

| Service | URL |
|---------|-----|
| 🌐 Frontend (Live Demo) | https://hirewave-frontend-yoqb.onrender.com |
| ⚙️ Backend API | https://hirewave-backend-8h0a.onrender.com/api/jobs/ |
| 📁 GitHub Repository | https://github.com/mahanthileelakrishnaprasad-alt/hirewave |

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Local Setup](#local-setup)
6. [API Reference](#api-reference)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Deployment Guide](#deployment-guide)
9. [Testing](#testing)

---

## Project Overview

HireWave is a full-stack job board platform that connects job seekers with employers across India. It provides a seamless experience for browsing, searching, filtering, and posting job listings.

Built as part of the Globalco Software Engineer technical assessment — demonstrating full-stack development, REST API design, CI/CD automation, and cloud deployment skills.

---

## Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Python 3.11 | Core language |
| Django 4.2.7 | Web framework |
| Django REST Framework | REST API layer |
| django-cors-headers | Cross-origin request handling |
| WhiteNoise | Static file serving |
| Gunicorn | Production WSGI server |
| SQLite | Database |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI library |
| Vite | Build tool and dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client for API calls |
| Lucide React | Icon library |

### DevOps
| Technology | Purpose |
|-----------|---------|
| GitHub Actions | CI/CD pipeline automation |
| Render (Backend) | Django REST API hosting |
| Render (Frontend) | React static site hosting |

---

## Features

### For Job Seekers
- **Browse Jobs** — Paginated job listings with rich card UI
- **Search** — Full-text search across title, company, location, and skills
- **Filter** — Filter by category (Engineering, Design, Data, etc.) and job type (Full-time, Remote, Contract, Internship)
- **Location Filter** — Search by city or region
- **Job Detail** — Full job description, requirements, skills, salary range, deadline
- **Bookmark Jobs** — Save jobs locally and access from the Saved Jobs page
- **Featured Jobs** — Highlighted premium listings with visual badge

### For Employers
- **Post a Job** — Full job creation form with validation
- **Skills Tag Input** — Add skills by typing and pressing Enter
- **Success Confirmation** — Instant feedback on job posting

### Platform
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Dark Theme** — Professional dark UI with purple accent palette
- **Skeleton Loaders** — Smooth loading states for all async content
- **Pagination** — Backend-powered page navigation
- **Live Stats** — Job count by category and type on homepage

---

## Project Structure
hirewave/

├── .github/

│   └── workflows/

│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline

│

├── backend/                       # Django project

│   ├── config/

│   │   ├── settings.py            # Django settings

│   │   ├── urls.py                # Root URL config

│   │   └── wsgi.py                # WSGI entry point

│   ├── jobs/

│   │   ├── models.py              # Job model

│   │   ├── serializers.py         # DRF serializers

│   │   ├── views.py               # API views

│   │   ├── urls.py                # App URL config

│   │   ├── tests.py               # Unit tests (10 tests)

│   │   └── management/

│   │       └── commands/

│   │           └── seed_jobs.py   # Database seeder

│   ├── requirements.txt

│   ├── runtime.txt                # Python 3.11

│   └── Procfile

│

└── frontend/                      # React + Vite

├── src/

│   ├── components/

│   │   ├── Navbar.jsx         # Top navigation with search

│   │   └── JobCard.jsx        # Job listing card

│   ├── pages/

│   │   ├── Home.jsx           # Listings + filters + hero

│   │   ├── JobDetail.jsx      # Full job view

│   │   ├── PostJob.jsx        # Job creation form

│   │   └── Bookmarks.jsx      # Saved jobs page

│   ├── hooks/

│   │   └── useBookmarks.js    # localStorage bookmark state

│   ├── api.js                 # Axios API client

│   ├── App.jsx                # Router + layout

│   └── index.css              # Global styles + CSS variables

└── .env.example

---

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 1. Clone the repo
```bash
git clone https://github.com/mahanthileelakrishnaprasad-alt/hirewave.git
cd hirewave
```

### 2. Backend setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_jobs
python manage.py runserver
```
API runs at: `http://localhost:8000/api/jobs/`

### 3. Frontend setup
```bash
cd frontend
npm install
# Create .env file:
echo "VITE_API_URL=http://localhost:8000/api" > .env
npm run dev
```
App runs at: `http://localhost:5173`

### 4. Run tests
```bash
cd backend
python manage.py test jobs --verbosity=2
```

---

## API Reference

**Base URL:** `https://hirewave-backend-8h0a.onrender.com/api`

### GET `/jobs/`
Returns paginated list of active jobs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search title, company, skills |
| `category` | string | Filter by category slug |
| `job_type` | string | Filter by type (full-time, remote, etc.) |
| `location` | string | Filter by location (partial match) |
| `featured` | boolean | Show only featured jobs |
| `page` | integer | Page number (default: 1) |

**Example Response:**
```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Senior Python Developer",
      "company": "TechCorp India",
      "location": "Hyderabad, Telangana",
      "job_type": "full-time",
      "category": "engineering",
      "salary_min": 1200000,
      "salary_max": 2000000,
      "skills": ["Python", "Django", "DRF"],
      "is_featured": true,
      "posted_at": "2026-06-12T00:00:00Z"
    }
  ]
}
```

### GET `/jobs/<id>/`
Returns full details of a single job.

### POST `/jobs/post/`
Creates a new job listing.

**Request Body:**
```json
{
  "title": "Backend Developer",
  "company": "MyCompany",
  "location": "Hyderabad",
  "job_type": "full-time",
  "category": "engineering",
  "description": "Build scalable APIs...",
  "requirements": "3+ years Python...",
  "salary_min": 600000,
  "salary_max": 1000000,
  "experience_years": 3,
  "skills": ["Python", "Django"]
}
```

### GET `/jobs/stats/`
Returns job count statistics.

**Example Response:**
```json
{
  "total_jobs": 8,
  "by_category": {
    "Engineering": 5,
    "Data & Analytics": 2,
    "Design": 1
  },
  "by_type": {
    "Full Time": 6,
    "Remote": 1,
    "Internship": 1
  }
}
```

---

## CI/CD Pipeline

The GitHub Actions workflow runs on every push to `main`:
Push to main

│

├── Job 1: backend-test

│   ├── Setup Python 3.11

│   ├── pip install -r requirements.txt

│   ├── python manage.py check

│   ├── python manage.py migrate

│   └── python manage.py test (10 tests)

│

├── Job 2: frontend-build

│   ├── Setup Node.js 20

│   ├── npm ci

│   └── npm run build

│

├── Job 3: deploy-vercel (on main push only)

│   └── Deploy frontend to Vercel

│

└── Job 4: deploy-render (on main push only)

└── Trigger Render backend redeploy

---

## Deployment Guide

### Backend on Render
| Setting | Value |
|---------|-------|
| Service Type | Web Service |
| Root Directory | `backend` |
| Environment | Python 3 |
| Build Command | `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_jobs` |
| Start Command | `gunicorn config.wsgi:application` |
| Environment Variables | `SECRET_KEY`, `DEBUG=False` |

### Frontend on Render
| Setting | Value |
|---------|-------|
| Service Type | Static Site |
| Root Directory | `frontend` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |
| Environment Variables | `VITE_API_URL=https://hirewave-backend-8h0a.onrender.com/api` |

---

## Testing

10 unit tests covering all major API endpoints:

| Test | Description |
|------|-------------|
| `test_list_jobs_returns_200` | Job list endpoint returns HTTP 200 |
| `test_list_jobs_contains_seeded_job` | Seeded jobs appear in listing |
| `test_job_detail_returns_200` | Job detail returns correct job |
| `test_job_detail_404_for_missing` | Returns 404 for invalid job ID |
| `test_search_by_title` | Search parameter filters correctly |
| `test_filter_by_category` | Category filter works correctly |
| `test_filter_by_job_type` | Job type filter works correctly |
| `test_stats_endpoint` | Stats returns total and breakdown |
| `test_create_job` | POST creates new job with 201 |
| `test_inactive_jobs_not_listed` | Inactive jobs excluded from list |

Run all tests:
```bash
cd backend
python manage.py test jobs --verbosity=2
```

---

## Built by

**Mahanthi Leela Krishna Prasad**
Python Full-Stack Developer | Hyderabad, Telangana
B.Tech CSE (AI/ML) — Kallam Haranadhareddy Institute of Technology

*Assessment submission for Globalco Software Engineer Position — June 2026*
