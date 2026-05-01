import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Global styles
import './styles/global.css';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import ChatBot from './components/ChatBot';

// Auth & Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageJobs from './pages/Admin/ManageJobs';
import ManagePayments from './pages/Admin/ManagePayments';
import ManageTickets from './pages/Admin/ManageTickets';

// Contractor Pages
import ContractorDashboard from './pages/Contractor/ContractorDashboard';
import CreateJob from './pages/Contractor/CreateJob';
import MyJobs from './pages/Contractor/MyJobs';
import AssignLabour from './pages/Contractor/AssignLabour';
import RaiseTicket from './pages/Contractor/RaiseTicket';
import ViewAttendance from './pages/Contractor/ViewAttendance';

// Labour Pages
import LabourDashboard from './pages/Labour/LabourDashboard';
import AvailableJobs from './pages/Labour/AvailableJobs';
import MyAssignments from './pages/Labour/MyAssignments';
import MarkAttendance from './pages/Labour/MarkAttendance';
import ViewPayments from './pages/Labour/ViewPayments';
import LabourRaiseTicket from './pages/Labour/LabourRaiseTicket';

// Help Center Pages
import HelpCenterDashboard from './pages/HelpCenter/HelpCenterDashboard';
import AssignedTickets from './pages/HelpCenter/AssignedTickets';
import UpdateTicketStatus from './pages/HelpCenter/UpdateTicketStatus';

// ---- Sidebar Navigation Links per Role ----

const adminLinks = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'Manage Users', icon: '👥' },
  { path: '/admin/jobs', label: 'Manage Jobs', icon: '💼' },
  { path: '/admin/payments', label: 'Payments', icon: '💰' },
  { path: '/admin/tickets', label: 'Tickets', icon: '🎫' },
];

const contractorLinks = [
  { path: '/contractor', label: 'Dashboard', icon: '📊' },
  { path: '/contractor/create-job', label: 'Create Job', icon: '➕' },
  { path: '/contractor/my-jobs', label: 'My Jobs', icon: '💼' },
  { path: '/contractor/assign-labour', label: 'Assign Labour', icon: '👷' },
  { path: '/contractor/attendance', label: 'Attendance', icon: '📋' },
  { path: '/contractor/raise-ticket', label: 'Raise Ticket', icon: '🎫' },
];

const labourLinks = [
  { path: '/labour', label: 'Dashboard', icon: '📊' },
  { path: '/labour/available-jobs', label: 'Available Jobs', icon: '🔍' },
  { path: '/labour/assignments', label: 'My Assignments', icon: '📋' },
  { path: '/labour/attendance', label: 'Mark Attendance', icon: '✅' },
  { path: '/labour/payments', label: 'Payments', icon: '💰' },
  { path: '/labour/raise-ticket', label: 'Raise Ticket', icon: '🎫' },
];

const helpCenterLinks = [
  { path: '/helpcenter', label: 'Dashboard', icon: '📊' },
  { path: '/helpcenter/tickets', label: 'Assigned Tickets', icon: '🎫' },
  { path: '/helpcenter/update-status', label: 'Update Status', icon: '🔄' },
];

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ---- Admin Routes ---- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardLayout links={adminLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="tickets" element={<ManageTickets />} />
        </Route>

        {/* ---- Contractor Routes ---- */}
        <Route
          path="/contractor"
          element={
            <ProtectedRoute allowedRoles={['CONTRACTOR']}>
              <DashboardLayout links={contractorLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<ContractorDashboard />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="assign-labour" element={<AssignLabour />} />
          <Route path="attendance" element={<ViewAttendance />} />
          <Route path="raise-ticket" element={<RaiseTicket />} />
        </Route>

        {/* ---- Labour Routes ---- */}
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={['LABOUR']}>
              <DashboardLayout links={labourLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<LabourDashboard />} />
          <Route path="available-jobs" element={<AvailableJobs />} />
          <Route path="assignments" element={<MyAssignments />} />
          <Route path="attendance" element={<MarkAttendance />} />
          <Route path="payments" element={<ViewPayments />} />
          <Route path="raise-ticket" element={<LabourRaiseTicket />} />
        </Route>

        {/* ---- Help Center Routes ---- */}
        <Route
          path="/helpcenter"
          element={
            <ProtectedRoute allowedRoles={['HELP_CENTER']}>
              <DashboardLayout links={helpCenterLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<HelpCenterDashboard />} />
          <Route path="tickets" element={<AssignedTickets />} />
          <Route path="update-status" element={<UpdateTicketStatus />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
