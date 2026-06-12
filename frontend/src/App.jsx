import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Bookmarks from './pages/Bookmarks';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center', color: 'var(--text3)', fontSize: 13, marginTop: 60 }}>
        © 2025 HireWave — Built with Django + React
      </footer>
    </BrowserRouter>
  );
}