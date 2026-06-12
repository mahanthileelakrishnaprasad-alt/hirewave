import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobs, getStats } from '../api';
import JobCard from '../components/JobCard';
import { SlidersHorizontal, Briefcase, X } from 'lucide-react';

const CATEGORIES = ['engineering', 'design', 'marketing', 'sales', 'finance', 'hr', 'operations', 'data', 'product'];
const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship', 'remote'];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', job_type: '', location: '', search: searchParams.get('search') || '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getStats().then(r => setStats(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { page };
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.job_type) params.job_type = filters.job_type;
    if (filters.location) params.location = filters.location;
    getJobs(params).then(r => {
      setJobs(r.data.results || r.data);
      setTotalCount(r.data.count || 0);
      setTotalPages(Math.ceil((r.data.count || 0) / 10));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [filters, page]);

  const activeFilters = Object.entries(filters).filter(([, v]) => v);

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--bg) 0%, #1a1428 50%, var(--bg) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge badge-purple" style={{ marginBottom: 16 }}>🚀 {totalCount}+ Jobs Available</div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
            Find Your Next<br /><span style={{ color: 'var(--accent2)' }}>Dream Role</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 500, margin: '0 auto 32px' }}>
            Thousands of opportunities from top companies across India — updated daily.
          </p>
          <div style={{ display: 'flex', gap: 8, maxWidth: 640, margin: '0 auto', flexWrap: 'wrap' }}>
            <input value={filters.search} onChange={e => { setFilters(f => ({ ...f, search: e.target.value })); setPage(1); }}
              placeholder="Job title, skill, or keyword..."
              style={{ flex: 1, minWidth: 200, padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 15, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            <input value={filters.location} onChange={e => { setFilters(f => ({ ...f, location: e.target.value })); setPage(1); }}
              placeholder="Location..."
              style={{ width: 160, padding: '12px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 15, outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          {stats && (
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
              {Object.entries(stats.by_type || {}).slice(0, 3).map(([type, count]) => (
                <div key={type} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent2)' }}>{count}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>{type}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-outline" onClick={() => setShowFilters(!showFilters)} style={{ padding: '8px 14px' }}>
            <SlidersHorizontal size={14} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          {CATEGORIES.slice(0, 5).map(c => (
            <button key={c} onClick={() => { setFilters(f => ({ ...f, category: f.category === c ? '' : c })); setPage(1); }}
              className={`btn ${filters.category === c ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '6px 14px', fontSize: 13, textTransform: 'capitalize' }}>
              {c}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button className="btn btn-outline" onClick={() => { setFilters({ category: '', job_type: '', location: '', search: '' }); setPage(1); }}
              style={{ padding: '6px 14px', fontSize: 13, color: 'var(--red)' }}>
              <X size={13} /> Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text3)', display: 'block', marginBottom: 6 }}>Category</label>
              <select value={filters.category} onChange={e => { setFilters(f => ({ ...f, category: e.target.value })); setPage(1); }}
                style={{ padding: '8px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 13 }}>
                <option value="">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text3)', display: 'block', marginBottom: 6 }}>Job Type</label>
              <select value={filters.job_type} onChange={e => { setFilters(f => ({ ...f, job_type: e.target.value })); setPage(1); }}
                style={{ padding: '8px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 13 }}>
                <option value="">All Types</option>
                {JOB_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            {loading ? 'Searching...' : `${totalCount} job${totalCount !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 200 }} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text2)' }}>
            <Briefcase size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <h3 style={{ marginBottom: 8 }}>No jobs found</h3>
            <p style={{ fontSize: 14 }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40 }}>
            <button className="btn btn-outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => (
              <button key={i + 1} className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPage(i + 1)} style={{ padding: '8px 14px', minWidth: 40 }}>{i + 1}</button>
            ))}
            <button className="btn btn-outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}