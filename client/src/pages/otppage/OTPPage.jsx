import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Toast } from "../../components";
import { ArrowLeft } from "lucide-react"; // Lucide React for a better arrow icon
import { useSelector } from "react-redux";

const OTPPage = () => {
  const userCheck = useSelector((state) => state.auth.user);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [resendDisabled, setResendDisabled] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });
  const inputRefs = useRef([]);
  const navigate = useNavigate();

   // Timer for Resend Button
   useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (userCheck) {
    if (userCheck.verified) {
      return <Navigate to="/home" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle Backspace Navigation
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Simulate Submit (Combine OTP)
  const handleSubmit = () => {
    const otpValue = otp.join("");

    if (otpValue.length === 4) {
      setToast({ message: "OTP Verified!", type: "success" });
    } else {
      setToast({ message: "Invalid OTP!", type: "error" });
    }
  };

 

  // Resend OTP (Reset Timer)
  const handleResend = () => {
    setOtp(["", "", "", ""]); // Clear OTP fields
    setTimer(60); // Reset timer (1 min)
    setResendDisabled(true); // Disable button again
    setToast({ message: "OTP Resent!", type: "info" });
  };

  // Navigate Back
  const handleBack = () => {
    navigate("/"); // Go to previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-all duration-300"
      >
        <ArrowLeft size={20} /> {/* Lucide React Arrow Icon */}
        <span className="font-medium">Back</span>
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>
        <p className="text-gray-500 text-center mb-4">
          We have sent a 4-digit code to your email
        </p>

        <div className="flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-16 h-16 text-center text-2xl border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Verify OTP
        </button>

        <div className="text-center mt-6">
          {resendDisabled ? (
            <p className="text-gray-500">
              Resend OTP in <span className="font-medium">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline disabled:text-gray-400"
              disabled={resendDisabled}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default OTPPage;
