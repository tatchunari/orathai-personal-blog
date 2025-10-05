export const InlineLoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      {/* Spinner */}
      {/* <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div> */}
      <div className="flex flex-col items-center justify-center gap-5">
        <img
          className="h-40 w-40"
          src="/public/spinning-capy-nobg.gif"
          alt="loading-capybara"
        />
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-gray-700 font-medium text-lg">
        Loading... please wait
      </p>
    </div>
  );
};
