// Admin Sidebar
import { SlNotebook } from "react-icons/sl";
import { MdOutlineFolder } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { GoPerson } from "react-icons/go";


import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: "articles", label: "Article management", icon: SlNotebook, path: '/admin/article-management' },
  { id: "categories", label: "Category management", icon: MdOutlineFolder, path: '/admin/category-management' },
  { id: "profile", label: "Profile", icon: GoPerson, path: '/admin/profile' },
  { id: "notifications", label: "Notification", icon: FaRegBell, path: '/admin/notifications-management' },
  { id: "resetPassword", label: "Reset Password", icon: GrPowerReset, path: '/admin/resetpassword' },

];

const AdminPanel = ({ onSelect, activePage }) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    onSelect(id);
  }

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
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => navigate(`${item.path}`)}
                className='w-full text-sm text-left px-10 py-4 flex items-center gap-3 hover:bg-[#DAD6D1] cursor-pointer transition-colors'
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
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