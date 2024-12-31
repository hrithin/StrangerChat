
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="w-full max-w-4xl p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl text-center">
        <h1 className="text-5xl font-extrabold mb-4">Chat with Strangers</h1>
        <p className="text-xl mb-8">
          Connect with new people from around the world! 🌍
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-2 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6zm-8-1c0 1.105.672 2 1.5 2s1.5-.895 1.5-2S10.328 7 9.5 7 8 7.895 8 9zm7-1c0 1.105.672 2 1.5 2s1.5-.895 1.5-2S17.328 6 16.5 6 15 6.895 15 8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg">Meet new people instantly</span>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg">No registration required</span>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg">Safe and anonymous</span>
          </div>
        </div>

        <Link to="/login">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105">
            Start Chatting Now!
          </button>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4">Already have an account?</p>
        <Link
          to="/login"
          className="text-purple-200 hover:text-white font-bold transition duration-300 ease-in-out"
        >
          Log in here
        </Link>
      </div>

      <footer className="mt-16 text-sm opacity-75">
        © 2023 Chat with Strangers. All rights reserved.
      </footer>
    </div>
  );
}
