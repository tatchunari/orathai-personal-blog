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
      <Navbar/>

    <div className="flex-grow bg-[#F7F6F4] flex flex-col justify-center items-center px-4 py-15">
      {/* Header */}
      <div className="flex items-center space-x-4 my-10">
        <img src="mockpfp.jpg" alt="profile-icon" className="h-10 w-10 rounded-full"/>
        <h1 className="font-semibold text-xl text-[#75716B]">Full Name</h1>
        <div className="h-5 border-l border-gray-400"></div>
        <p className="font-semibold text-xl">Profile</p>
      </div>
      <div className="flex flex-row">
        
      {/* Side bar */}
      <div className="w-80">
        <aside>
          <nav className="text-gray-600">
            <button 
            className="flex flex-row gap-3 my-4 cursor-pointer hover:text-black focus:bg-gray-200 active:bg-gray-200 rounded-md px-4 py-2"
            onClick={() => setActiveTab("profile")}
            >
              <RxPerson className="w-5 h-5"/>
              <p className="text-sm">Profile</p>
            </button>
            <button 
            className="flex flex-row gap-3 cursor-pointer hover:text-black focus:bg-gray-200 active:bg-gray-200 rounded-md px-4 py-2"
            onClick={() => setActiveTab("resetPassword")}
            >
              <GrPowerReset className="w-5 h-5"/>
              <p className="text-sm">Reset password</p>
            </button>
          </nav>
        </aside>
        </div>
        
      <div className="flex items-center justify-center w-full bg-[#EFEEEB] rounded-xl shadow py-8">
      
        {/* Right Form */}
        {activeTab === "profile" && <ProfileForm/>}
        {activeTab === "resetPassword" && <ResetPasswordForm/>}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MemberManagementPage