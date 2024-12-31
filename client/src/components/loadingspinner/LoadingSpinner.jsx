
// eslint-disable-next-line react/prop-types
const LoadingSpinner = ({ size = "6", color = "purple-500" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent border-${color} rounded-full animate-spin`}
        style={{ borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;