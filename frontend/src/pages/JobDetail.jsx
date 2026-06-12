import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getJob } from '../api';
import { useBookmarks } from '../hooks/useBookmarks';
import { MapPin, Clock, Briefcase, DollarSign, ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Star, Users, Calendar } from 'lucide-react';

const TYPE_COLORS = { 'full-time': 'badge-green', 'part-time': 'badge-amber', 'contract': 'badge-cyan', 'internship': 'badge-purple', 'remote': 'badge-purple' };

function formatSalary(min, max, currency) {
  if (!min && !max) return null;
  const fmt = (n) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`;
  return currency === 'INR' ? `₹${fmt(min)} – ₹${fmt(max)} per year` : `$${fmt(min)} – $${fmt(max)} per year`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)} week(s) ago`;
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggle } = useBookmarks();

  useEffect(() => {
    getJob(id).then(r => { setJob(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="container" style={{ padding: '40px 24px' }}>
      {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 60, marginBottom: 16 }} />)}
    </div>
  );

  if (!job) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h2>Job not found</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Jobs</Link>
    </div>
  );

  const bookmarked = isBookmarked(job.id);
  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);

  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: 860 }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft size={15} /> Back to listings
      </Link>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <img src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=2a2a38&color=a09eb8`}
            alt={job.company} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', border: '1px solid var(--border)' }} />
          <div style={{ flex: 1 }}>
            {job.is_featured && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent2)', marginBottom: 6 }}>
                <Star size={12} fill="currentColor" /> Featured Role
              </div>
            )}
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(20px,3vw,26px)', fontWeight: 700, marginBottom: 4 }}>{job.title}</h1>
            <p style={{ color: 'var(--text2)', fontSize: 15 }}>{job.company}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => toggle(job)} className={`btn ${bookmarked ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '10px 14px' }}>
              {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
              {bookmarked ? 'Saved' : 'Save'}
            </button>
            {job.apply_url
              ? <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Apply Now <ExternalLink size={14} /></a>
              : <button className="btn btn-primary">Apply Now</button>}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          {[
            { icon: <MapPin size={14} />, label: job.location },
            { icon: <Briefcase size={14} />, label: job.job_type?.replace('-', ' '), badge: TYPE_COLORS[job.job_type] },
            { icon: <Clock size={14} />, label: `Posted ${timeAgo(job.posted_at)}` },
            salary && { icon: <DollarSign size={14} />, label: salary },
            { icon: <Users size={14} />, label: `${job.experience_years}+ years experience` },
            job.deadline && { icon: <Calendar size={14} />, label: `Deadline: ${new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` },
          ].filter(Boolean).map((item, i) => (
            <span key={i} className={`badge ${item.badge || 'badge-gray'}`} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', fontSize: 13, textTransform: 'capitalize' }}>
              {item.icon} {item.label}
            </span>
          ))}
        </div>
      </div>

      {job.skills?.length > 0 && (
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Skills Required</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {job.skills.map(s => (
              <span key={s} style={{ padding: '6px 14px', background: 'var(--accent-glow)', color: 'var(--accent2)', border: '1px solid rgba(124,111,247,0.2)', borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>About this role</h2>
        <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{job.description}</p>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24, marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Requirements</h2>
        <p style={{ color: 'var(--text2)', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{job.requirements}</p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--bg2), #1a1428)', border: '1px solid rgba(124,111,247,0.3)', borderRadius: 'var(--radius)', padding: 28, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', marginBottom: 8 }}>Ready to apply?</h2>
        <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>Join the team at {job.company} and take your career to the next level.</p>
        {job.apply_url
          ? <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>Apply for this position <ExternalLink size={15} /></a>
          : <button className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>Apply for this position</button>}
      </div>
    </div>
  );
}