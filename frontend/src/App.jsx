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

const StudentDashboard = () => (
  <div className="container mx-auto p-4">
    <div className="grid md:grid-cols-2 gap-6">
      <FeedbackForm />
      <FeedbackStatus />
    </div>
  </div>
);

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route 
         path="/login" 
         element={!user ? <Login /> : <Navigate to={user.isAdmin ? "/management" : "/student"} replace />} 
         />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={user.isAdmin ? "/management" : "/student"} />}
        />

        {/* Student Routes */}
        <Route
          path="/student"
          element={user && !user.isAdmin ? <StudentDashboard /> : <Navigate to="/login" />}
        />

        {/* Management Routes */}
        <Route
          path="/management"
          element={user && user.isAdmin ? <ManagementDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/management/reports"
          element={user && user.isAdmin ? <Reports /> : <Navigate to="/login" />}
        />

        {/* Default Redirect */}
        <Route
          path="/"
          element={<Navigate to={user ? (user.isAdmin ? "/management" : "/student") : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;