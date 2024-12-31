import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Toast } from "../../components/index.js";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApiSlice.js";
import { useSelector } from "react-redux";


export default function Signup() {
  const userCheck = useSelector((state)=>state.auth.user)
  const [register] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  if (userCheck) {
    return <Navigate to="/home" replace />;
  }

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.gender
    ) {
      setSubmitted(false);
      console.log("All field are required !!");
      showToast("All field are required !!", "error");
    } else {
      try {
        setSubmitted(true);
        const resData = await register({...formData}).unwrap()
        console.log(resData,"haii")
        if (resData) showToast("registered successfully!!", "success");
        navigate("/login");
      } catch (error) {
        setSubmitted(false);
        if (error?.data?.status === 400) {
          showToast(error.data.message, "error");
        }
        console.log(error, "EEERRROORRR");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-center text-white mb-8">
            Join the fun and meet new people! 🌟
          </p>

          <form className="space-y-6" autoComplete="new-password">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                name="name"
                id="username"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Choose a username"
                required
                className="w-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                required
                className="w-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                required
                className="w-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="text-white">
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                defaultValue="" // Set the initial default value
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
                className="w-full bg-white bg-opacity-20 border-0 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
              >
                <option value="" disabled className="text-gray-300">
                  Select your gender
                </option>
                <option value="male" className="text-black">
                  Male
                </option>
                <option value="female" className="text-black">
                  Female
                </option>
              </select>
            </div>

            {/* Signup Button */}
            <button
              type="button"
              disabled={submitted}
              onClick={() => handleRegister()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up!
            </button>
          </form>

          {/* Redirect to Login */}
          <div className="mt-8 text-center">
            <p className="text-white">Already have an account?</p>
            <Link
              to="/login"
              className="text-purple-300 hover:text-purple-100 font-bold transition duration-300 ease-in-out"
            >
              Log in here
            </Link>
          </div>
        </div>
      </div>
      {/* Render Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={2000}
          onClose={() => setToast(null)} // Dismiss toast
        />
      )}
    </>
  );
}
