
const AlertDialog = ({ isOpen, onClose, message }) => {

  if (!isOpen) return null;
  return (
     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <p className="mb-4 font-bold">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-4 mb-2 rounded-full bg-[#26231E] text-white hover:bg-[#43403B] transition-colors cursor-pointer"
        >
          Create Account
        </button>
        <p className="text-[14px]">Already have an account? <span className="font-bold hover:text-blue-600 underline cursor-pointer">Sign In</span></p>
      </div>
    </div>
  )
}

export default AlertDialog