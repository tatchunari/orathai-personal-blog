import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
     <div>
        <Navbar/>
      <div className="flex flex-col min-h-screen items-center px-5">
      {/* Sign Up Form */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl my-20 py-8 px-10 space-y-6 bg-[#EFEEEB] rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mx-10 text-center text-[#26231E]">Log in</h2>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
             <div className="mt-1 mx-15">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
                className="block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>
          {/* Password Input */}
          <div>
            <div className="mt-1 mx-15">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                required
                className="block w-full px-4 py-2  bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* Log in Button */}
            <button
              type="submit"
              className="w-auto py-3 px-10 text-base text-white bg-[#26231E] rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
            >
              Log in
            </button>
          </div> 
        </form>
        <div className=" flex flex-row items-center justify-center text-center text-sm text-gray-600">
          <p className="mr-1">Don't have an account? </p>
          <Link to="/signup">
          <span className="font-medium text-gray-800 hover:underline cursor-pointer">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default LoginPage