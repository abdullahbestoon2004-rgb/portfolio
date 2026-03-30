import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageEducation from './pages/admin/ManageEducation';
import ManageProfile from './pages/admin/ManageProfile';
import Messages from './pages/admin/Messages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="education" element={<ManageEducation />} />
          <Route path="profile" element={<ManageProfile />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
