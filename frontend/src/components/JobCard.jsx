import { Link } from 'react-router-dom';
import { MapPin, Clock, Bookmark, BookmarkCheck, DollarSign, Star } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';

const TYPE_COLORS = { 'full-time': 'badge-green', 'part-time': 'badge-amber', 'contract': 'badge-cyan', 'internship': 'badge-purple', 'remote': 'badge-purple' };
const TYPE_LABELS = { 'full-time': 'Full Time', 'part-time': 'Part Time', 'contract': 'Contract', 'internship': 'Internship', 'remote': 'Remote' };

function formatSalary(min, max, currency) {
  if (!min && !max) return null;
  const fmt = (n) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`;
  return currency === 'INR' ? `₹${fmt(min)} – ₹${fmt(max)}` : `$${fmt(min)} – $${fmt(max)}`;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function JobCard({ job }) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(job.id);
  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, transition: 'all 0.2s', position: 'relative', borderLeft: job.is_featured ? '3px solid var(--accent)' : '1px solid var(--border)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = job.is_featured ? 'var(--accent)' : 'var(--border)'; e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.transform = 'none'; }}>

      {job.is_featured && (
        <div style={{ position: 'absolute', top: 14, right: 50, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accent2)' }}>
          <Star size={11} fill="currentColor" /> Featured
        </div>
      )}

      <button onClick={() => toggle(job)} style={{ position: 'absolute', top: 14, right: 16, background: 'none', border: 'none', color: bookmarked ? 'var(--accent2)' : 'var(--text3)', padding: 2 }}>
        {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>

      <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
        <img src={job.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=2a2a38&color=a09eb8`}
          alt={job.company} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <Link to={`/jobs/${job.id}`}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.title}</h3>
          </Link>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>{job.company}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        <span className={`badge ${TYPE_COLORS[job.job_type] || 'badge-gray'}`}>{TYPE_LABELS[job.job_type]}</span>
        <span className="badge badge-gray"><MapPin size={11} />{job.location}</span>
        {salary && <span className="badge badge-gray"><DollarSign size={11} />{salary}</span>}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {job.skills.slice(0, 4).map(s => (
          <span key={s} style={{ fontSize: 11, padding: '2px 8px', background: 'var(--accent-glow)', color: 'var(--accent2)', borderRadius: 4, border: '1px solid rgba(124,111,247,0.15)' }}>{s}</span>
        ))}
        {job.skills.length > 4 && <span style={{ fontSize: 11, color: 'var(--text3)' }}>+{job.skills.length - 4}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={11} />{timeAgo(job.posted_at)}
        </span>
        <Link to={`/jobs/${job.id}`} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 13 }}>View Details</Link>
      </div>
    </div>
  );
}