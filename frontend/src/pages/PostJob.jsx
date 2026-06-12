import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJob } from '../api';
import { ArrowLeft, CheckCircle, Briefcase } from 'lucide-react';

const CATEGORIES = ['engineering', 'design', 'marketing', 'sales', 'finance', 'hr', 'operations', 'data', 'product', 'other'];
const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship', 'remote'];

const inputStyle = { width: '100%', padding: '10px 14px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: 14, outline: 'none', display: 'block' };

export default function PostJob() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [form, setForm] = useState({ title: '', company: '', company_logo: '', location: '', job_type: 'full-time', category: 'engineering', description: '', requirements: '', salary_min: '', salary_max: '', salary_currency: 'INR', experience_years: 0, skills: [], apply_url: '', deadline: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) { set('skills', [...form.skills, s]); setSkillInput(''); }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.location || !form.description || !form.requirements) {
      setError('Please fill in all required fields.'); return;
    }
    setLoading(true); setError('');
    try {
      await createJob({ ...form, salary_min: form.salary_min || null, salary_max: form.salary_max || null });
      setSubmitted(true);
    } catch { setError('Failed to post job. Please check all fields.'); }
    finally { setLoading(false); }
  };

  if (submitted) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 500 }}>
      <CheckCircle size={56} color="var(--green)" style={{ marginBottom: 20 }} />
      <h1 style={{ fontFamily: 'Sora, sans-serif', marginBottom: 12 }}>Job Posted!</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 28 }}>Your listing is now live and visible to candidates.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={() => setSubmitted(false)} className="btn btn-outline">Post Another</button>
        <Link to="/" className="btn btn-primary">Browse Jobs</Link>
      </div>
    </div>
  );

  const Field = ({ label, required, children }) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
        {label} {required && <span style={{ color: 'var(--red)' }}>*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="container" style={{ padding: '32px 24px', maxWidth: 720 }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft size={15} /> Back to listings
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Briefcase size={18} color="white" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700 }}>Post a Job</h1>
          <p style={{ color: 'var(--text2)', fontSize: 13 }}>Reach thousands of qualified candidates</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>Basic Info</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
          <Field label="Job Title" required><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Python Developer" style={inputStyle} /></Field>
          <Field label="Company Name" required><input value={form.company} onChange={e => set('company', e.target.value)} placeholder="e.g. TechCorp India" style={inputStyle} /></Field>
          <Field label="Location" required><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Hyderabad, Telangana" style={inputStyle} /></Field>
          <Field label="Company Logo URL"><input value={form.company_logo} onChange={e => set('company_logo', e.target.value)} placeholder="https://..." style={inputStyle} /></Field>
          <Field label="Job Type" required>
            <select value={form.job_type} onChange={e => set('job_type', e.target.value)} style={inputStyle}>
              {JOB_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Category" required>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Min Salary (₹)"><input type="number" value={form.salary_min} onChange={e => set('salary_min', e.target.value)} placeholder="500000" style={inputStyle} /></Field>
          <Field label="Max Salary (₹)"><input type="number" value={form.salary_max} onChange={e => set('salary_max', e.target.value)} placeholder="1000000" style={inputStyle} /></Field>
          <Field label="Experience (years)"><input type="number" min="0" value={form.experience_years} onChange={e => set('experience_years', parseInt(e.target.value) || 0)} style={inputStyle} /></Field>
          <Field label="Application Deadline"><input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} style={inputStyle} /></Field>
          <Field label="Apply URL"><input value={form.apply_url} onChange={e => set('apply_url', e.target.value)} placeholder="https://..." style={inputStyle} /></Field>
        </div>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>Details</h2>
        <Field label="Job Description" required>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the role and responsibilities..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>
        <Field label="Requirements" required>
          <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)} placeholder="List required skills and qualifications..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>
        <Field label="Skills">
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              placeholder="Type a skill and press Enter" style={{ ...inputStyle, flex: 1 }} />
            <button type="button" onClick={addSkill} className="btn btn-outline" style={{ padding: '10px 16px' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {form.skills.map(s => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'var(--accent-glow)', color: 'var(--accent2)', border: '1px solid rgba(124,111,247,0.2)', borderRadius: 20, fontSize: 13 }}>
                {s} <button onClick={() => set('skills', form.skills.filter(x => x !== s))} style={{ background: 'none', border: 'none', color: 'var(--accent2)', cursor: 'pointer', padding: 0, fontSize: 16 }}>×</button>
              </span>
            ))}
          </div>
        </Field>
      </div>

      {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 16, color: 'var(--red)', fontSize: 14 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Link to="/" className="btn btn-outline">Cancel</Link>
        <button onClick={handleSubmit} className="btn btn-primary" disabled={loading} style={{ padding: '10px 28px', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Posting...' : 'Publish Job Listing'}
        </button>
      </div>
    </div>
  );
}