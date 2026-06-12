import { Link } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';
import JobCard from '../components/JobCard';
import { Bookmark, ArrowLeft } from 'lucide-react';

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="container" style={{ padding: '32px 24px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft size={15} /> Back to listings
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <Bookmark size={22} color="var(--accent2)" />
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 700 }}>Saved Jobs</h1>
        <span className="badge badge-purple">{bookmarks.length}</span>
      </div>

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Bookmark size={48} style={{ marginBottom: 16, color: 'var(--text3)' }} />
          <h3 style={{ marginBottom: 8, color: 'var(--text2)' }}>No saved jobs yet</h3>
          <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 24 }}>Bookmark jobs you are interested in to track them here.</p>
          <Link to="/" className="btn btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {bookmarks.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}