import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch ,useSelector } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const userCheck = useSelector((state)=>state.auth.user)
  const [login] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (userCheck) {
    return <Navigate to="/home" replace />;
  }


  async function handleSubmit(event) {
    event.preventDefault(); // Prevents form submission

    if (!formData.email || !formData.password) {
      console.log("All field are required !!");
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      if (result) {
        dispatch(setUser(result.user));
      }
      console.log(result);
    } catch (error) {
      console.log(error, "errroorro");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-white mb-8">
          Ready to chat with some cool strangers? 😎
        </p>

        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full bg-white bg-opacity-20 border-0 placeholder-gray-300 text-white focus:ring-2 focus:ring-purple-400 rounded px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Let&apos;s Go!
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white">Don&apos;t have an account?</p>
          <Link
            to="/signup"
            className="text-purple-300 hover:text-purple-100 font-bold transition duration-300 ease-in-out"
          >
            Join the party! 🎉
          </Link>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="text-white hover:text-purple-200 transition duration-300 ease-in-out transform hover:scale-110">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </button>
          <button className="text-white hover:text-purple-200 transition duration-300 ease-in-out transform hover:scale-110">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </button>
          <button className="text-white hover:text-purple-200 transition duration-300 ease-in-out transform hover:scale-110">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
