import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Search, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/?search=${encodeURIComponent(q.trim())}`);
  };

  return (
    <nav style={{ background: 'rgba(15,15,19,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24, height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 18 }}>
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={16} color="white" />
          </div>
          <span>Hire<span style={{ color: 'var(--accent2)' }}>Wave</span></span>
        </Link>

        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search jobs, companies, skills..."
            style={{ width: '100%', padding: '8px 12px 8px 36px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        </form>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <Link to="/bookmarks" className="btn btn-outline" style={{ padding: '8px 16px' }}>
            <Bookmark size={14} /> Saved
          </Link>
          <Link to="/post-job" className="btn btn-primary" style={{ padding: '8px 16px' }}>
            <Plus size={15} /> Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}