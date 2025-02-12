import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem('authToken');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">GrievEase</Link>
        
        <div className="flex items-center space-x-4">
          {auth.user ? (
            <>
              <span>Welcome, {auth.user.name}</span>
              {auth.user.role == 'admin' && (
                <Link to="/management" className="hover:text-gray-300">
                  Management Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;