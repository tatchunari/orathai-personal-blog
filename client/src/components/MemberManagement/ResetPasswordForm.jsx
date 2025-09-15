import { useState } from 'react';
import ResetPasswordAlertDialog from '../ResetPasswordAlertDialog';

const ResetPasswordForm = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleConfirm = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  }
  return (
    
  <div>
      <main className="flex-1">

          {/* Form */}
          <form className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                className="mt-1 block w-96 rounded-md border bg-white border-gray-300 px-4 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="mt-1 block w-full bg-white rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                className="mt-1 block w-full bg-white rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>


            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleConfirm}
                type="button"
                className="px-10 py-3 text-base rounded-full bg-[#26231E] text-white cursor-pointer hover:bg-gray-800"
              >
                Reset Password
              </button>
              <ResetPasswordAlertDialog 
              isOpen={isDialogOpen}
              />
            </div>
          </form>
      </main>
    </div>
  )
}

export default ResetPasswordForm