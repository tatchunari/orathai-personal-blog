const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-700 font-medium text-lg">
        Loading... please wait
      </p>
    </div>
  );
};

export default LoadingScreen;