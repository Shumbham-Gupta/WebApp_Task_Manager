

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Section */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center space-x-2"
          >
            <CheckSquare className="h-8 w-8 text-white
            " />
            <span className="text-xl font-bold text-white">
              TaskInfus
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                <div className="flex items-center space-x-2 text-white">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium "
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
