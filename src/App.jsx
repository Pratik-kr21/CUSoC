import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ContributorForm from './pages/ContributorForm';
import IndustryMentorForm from './pages/IndustryMentorForm';
import FacultyMentorForm from './pages/FacultyMentorForm';
import StudentMentorForm from './pages/StudentMentorForm';
import InstitutionalProjectForm from './pages/InstitutionalProjectForm';
import IndustryProjectForm from './pages/IndustryProjectForm';
import MentorPortal from './pages/MentorPortal';
import ProjectPortal from './pages/ProjectPortal';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register/contributor" element={<ContributorForm />} />
            <Route path="/register/mentor" element={<MentorPortal />} />
            <Route path="/register/project" element={<ProjectPortal />} />
            <Route path="/apply/mentor/industry" element={<IndustryMentorForm />} />
            <Route path="/apply/mentor/faculty" element={<FacultyMentorForm />} />
            <Route path="/apply/mentor/student" element={<StudentMentorForm />} />
            <Route path="/apply/project/institutional" element={<InstitutionalProjectForm />} />
            <Route path="/apply/project/industry" element={<IndustryProjectForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
