import Navbar from "@/components/sub-components/Navbar";
import Footer from "@/components/sub-components/Footer";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Link } from "react-router-dom";
import { useAuth } from "@/context/authentication";
import { useState } from "react";

const SignUpPage = () => {
  const { register, state } = useAuth();

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Validation
  const validateInputs = () => {
    const errors = {};

    // Validate name
    if (!formValues.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      errors.name = "Name must contain only letters and spaces.";
    } else if (formValues.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    // Validate username
    if (!formValues.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formValues.username)) {
      errors.username =
        "Username can only contain letters, numbers, dots, underscores, and dashes.";
    } else if (formValues.username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    } else if (formValues.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters.";
    }

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formValues.password)) {
      errors.password = "Password must contain letters and numbers.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await register(formValues);
      if (result?.error) {
        let suggestionMessage = "";

        // Check for email or username-related issues
        if (result.error.toLowerCase().includes("email")) {
          suggestionMessage = "Try using a different email address.";
        } else if (result.error.toLowerCase().includes("username")) {
          suggestionMessage = "Try using a different username.";
        }
        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">
                {suggestionMessage && (
                  <span className="block mt-2 text-sm">
                    {suggestionMessage}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    }
  };

  // Handle Inout change
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center px-5">
        {/* Sign Up Form */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl my-20 py-8 px-10 space-y-6 bg-[#EFEEEB] rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-[#26231E]">
            Sign up
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                  className={`block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                  disabled={state.loading}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs absolute">
                    {formErrors.name}
                  </p>
                )}
              </div>
            </div>
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  autoComplete="username"
                  placeholder="Username"
                  onChange={(e) => handleChange("username", e.target.value)}
                  className={`block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 ${
                    formErrors.username ? "border-red-500" : ""
                  }`}
                  disabled={state.loading}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs absolute">
                    {formErrors.username}
                  </p>
                )}
              </div>
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  autoComplete="email"
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 ${
                    formErrors.username ? "border-red-500" : ""
                  }`}
                  disabled={state.loading}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs absolute">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={formValues.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Password"
                  className={`block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500 ${
                    formErrors.username ? "border-red-500" : ""
                  }`}
                  disabled={state.loading}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs absolute">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-auto py-3 px-10 text-base text-white bg-[#26231E] rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  ""
                )}
                Sign up
              </button>
            </div>
          </form>
          <div className=" flex flex-row items-center justify-center text-center text-sm text-gray-600">
            <p className="mr-1">Already have an account? </p>
            <Link to="/login">
              <span className="font-medium text-gray-800 hover:underline cursor-pointer">
                Log in
              </span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;
