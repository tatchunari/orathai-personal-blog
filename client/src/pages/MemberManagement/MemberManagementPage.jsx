import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileForm from "../../components/MemberManagement/ProfileForm";
import ResetPasswordForm from "@/components/MemberManagement/ResetPasswordForm";

import { RxPerson } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";

const MemberManagementPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />

      <div className="flex-grow bg-[#F7F6F4] flex flex-col items-center px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-x-3 sm:flex-row sm:items-center sm:space-x-4 my-6 sm:my-10 text-center sm:text-left">
          <img
            src="mockpfp.jpg"
            alt="profile-icon"
            className="h-12 w-12 sm:h-10 sm:w-10 rounded-full mx-auto sm:mx-0"
          />
          <h1 className="font-semibold text-lg sm:text-xl text-[#75716B] mt-2 sm:mt-0">
            Full Name
          </h1>
          <div className="hidden sm:block h-5 border-l border-gray-400"></div>
          <p className="font-semibold text-lg sm:text-xl">Profile</p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
          {/* Sidebar */}
          <div className="w-full md:w-80">
            <aside>
              <nav className="text-gray-600 flex md:flex-col gap-3 justify-center md:justify-start">
                <button
                  className={`flex flex-row gap-3 items-center cursor-pointer hover:text-black rounded-md px-4 py-2 ${
                    activeTab === "profile"
                      ? "bg-gray-200 text-black"
                      : "focus:bg-gray-200 active:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <RxPerson className="w-5 h-5" />
                  <p className="text-sm">Profile</p>
                </button>
                <button
                  className={`flex flex-row gap-3 items-center cursor-pointer hover:text-black rounded-md px-4 py-2 ${
                    activeTab === "resetPassword"
                      ? "bg-gray-200 text-black"
                      : "focus:bg-gray-200 active:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("resetPassword")}
                >
                  <GrPowerReset className="w-5 h-5" />
                  <p className="text-sm">Reset password</p>
                </button>
              </nav>
            </aside>
          </div>

          {/* Right Form */}
          <div className="flex items-center justify-center w-full bg-[#EFEEEB] rounded-xl shadow p-6 sm:p-8">
            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "resetPassword" && <ResetPasswordForm />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MemberManagementPage;
