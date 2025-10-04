const ResetPasswordAlertDialog = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white py-10 items-center justify-center rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <h1 className="font-semibold mb-4">Reset Password</h1>
        <p className="text-xs mb-4 text-gray-500">
          Do you want to reset your password?
        </p>
        {/* Buttons */}
        <div className="flex flex-row justify-center gap-x-3">
          <button className="px-10 py-3 text-xs border border-[#26231E] rounded-full bg-white text-[#26231E] cursor-pointer hover:bg-[#26231E] hover:text-white">
            Cancel
          </button>
          <button className="px-10 py-3 text-xs rounded-full bg-[#26231E] text-white cursor-pointer hover:bg-gray-800">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordAlertDialog;
