import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs w-full p-4 rounded-lg shadow-md text-white transform transition-all duration-300 ${
        message ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      } ${typeStyles[type]}`}
    >
      <div className="flex items-center space-x-3">
        {/* Type Icon */}
        {/* <span
          className={`w-6 h-6 flex items-center justify-center rounded-full ${
            type === "success"
              ? "bg-green-100 text-green-700"
              : type === "error"
              ? "bg-red-100 text-red-700"
              : type === "info"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {type === "success" }
          {type === "error" }
          {type === "info" }
          {type === "warning" }
        </span> */}
        {/* Message */}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
