export const InlineLoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="mt-4 text-gray-700 font-medium text-lg">
        Loading... please wait
      </p>
    </div>
  );
};
