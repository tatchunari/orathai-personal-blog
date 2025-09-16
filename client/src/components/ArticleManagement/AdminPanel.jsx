// Admin Sidebar
import { SlNotebook } from "react-icons/sl";
import { MdOutlineFolder } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

const AdminPanel = () => {
  return (
    <div className="bg-[#EFEEEB] min-h-screen flex flex-col w-72">
      {/* Header */}
      <div>
        <h1 className="md:text-2xl text-lg font-semibold text-gray-700 mt-20 ml-10">
          Orathai.Blog
        </h1>
        <p className="font-medium text-lg text-[#F2B68C] ml-10 mt-3">
          Admin Panel
        </p>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col justify-between flex-grow mt-10">
        {/* Top Nav */}
        <div>
          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <SlNotebook className="w-5 h-5" />
            Article management
          </button>

          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <MdOutlineFolder className="w-6 h-6" />
            Category management
          </button>

          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <FaRegBell className="w-5 h-5" />
            Notification
          </button>

          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <GrPowerReset className="w-5 h-5" />
            Reset Password
          </button>
        </div>

        {/* Bottom Nav */}
        <div>
          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <FiExternalLink className="w-5 h-5" />
            Orathai.Blog website
          </button>

          <button className="w-full text-sm text-left px-10 py-4 text-[#75716B] flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer">
            <BiLogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
