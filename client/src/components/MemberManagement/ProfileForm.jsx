const ProfileForm = () => {
  return (
    <div>
      <main className="flex-1">
          {/* Profile Header */}
          <div className="flex items-center space-x-10 mb-8">
            <img
              src="mockpfp.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="px-4 py-2 border border-gray-400 rounded-full text-sm font-medium bg-[#FFFFFF] cursor-pointer hover:bg-gray-100">
              Upload profile picture
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full rounded-md border bg-white border-gray-300 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-full bg-white rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#75716B]">
                Email
              </label>
              <input
                id="email"
                type="email"
                disabled
                className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="px-10 py-3 text-base rounded-full bg-[#26231E] text-white cursor-pointer hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </form>
      </main>
    </div>
  )
}

export default ProfileForm