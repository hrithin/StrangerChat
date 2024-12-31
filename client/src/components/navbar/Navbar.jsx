import { useState } from "react";
import { ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logoutUser } from "../../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
 
  if (!userData) {
    return <Navigate to="/login" replace />;
  }else if(!userData.verified === true){
    return <Navigate to="/verification" replace />;
  }


  

  const logoutAndClearUser = async () => {
    try {
      const result = await logout().unwrap();
      if (result) {
        dispatch(logoutUser());
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md fixed w-full z-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Title */}
        <div className="text-2xl font-semibold text-gray-800">
          Stranger Chat
        </div>

        {/* Profile Section */}
        <div className="relative flex items-center space-x-4">
          {/* Display Name (Only on Desktop) */}
          <div className="hidden md:block text-lg font-medium text-gray-700">
            Hi, {userData.name}
          </div>

          {/* Profile Icon and Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <UserCircle className="w-8 h-8 text-gray-700" />
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border">
                {/* Show User Name in Dropdown on Mobile */}
                <div className="block md:hidden px-4 py-3 border-b">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-medium text-gray-800">{userData.name}</p>
                </div>

                <button className="w-full px-4 py-2 flex items-center hover:bg-gray-100">
                  <Settings className="w-5 h-5 mr-2" /> Settings
                </button>
                <button onClick={logoutAndClearUser} className="w-full px-4 py-2 flex items-center hover:bg-gray-100">
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
