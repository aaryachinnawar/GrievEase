import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import FeedbackForm from './pages/Student/FeedbackForm';
import FeedbackStatus from './pages/Student/FeedbackStatus';
import ManagementDashboard from './pages/Management/Dashboard';
import Reports from './pages/Management/Reports';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const StudentDashboard = () => (
  <div className="container mx-auto p-4">
    <div className="grid md:grid-cols-2 gap-6">
      <FeedbackForm />
      <FeedbackStatus />
    </div>
  </div>
);

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!auth.user ? <Login /> : <Navigate to={auth.user.role === "admin" ? "/management" : "/student"} replace />}
        />
        <Route
          path="/signup"
          element={!auth.user ? <Signup /> : <Navigate to={auth.user.role === 'student' ? "/management" : "/student"} />}
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={<PrivateRoute element={<StudentDashboard />} allowedRoles={['student']} />} // Only student can access
        />

        {/* Management Routes */}
        <Route
          path="/management"
          element={<PrivateRoute element={<ManagementDashboard />} allowedRoles={['admin']} />} // Only admin can access
        />
        <Route
          path="/management/reports"
          element={<PrivateRoute element={<Reports />} allowedRoles={['admin']} />} // Only admin can access
        />

        {/* Default Redirect */}
        <Route
          path="/"
          element={<Navigate to={auth.user ? (auth.user.role === 'admin' ? "/management" : "/student") : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
