import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { GrPowerReset } from "react-icons/gr";
import { SlLogout } from "react-icons/sl";
import { User } from "lucide-react";
import { RiAdminLine } from "react-icons/ri";

import { useAuth } from "@/context/authentication";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { isAuthenticated, state, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <div className="md:text-xl text-base font-semibold text-gray-700">
              Orathai.Blog
            </div>
          </Link>

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <RxHamburgerMenu className="w-6 h-6" />
          </button>

          {/* Mobile Drop Down Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 text-lg text-[#75716B] z-50">
              <button
                className="absolute top-5 right-5 text-2xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>

              {!isAuthenticated ? (
                <div className="flex flex-col gap-10">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </Link>

                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  <div className="flex flex-row gap-3">
                    <RxPerson className="w-6 h-6 text-gray-500" />
                    <Link to="/member" onClick={() => setMobileMenuOpen(false)}>
                      Profile
                    </Link>
                  </div>

                  <div className="flex flex-row gap-3">
                    <GrPowerReset className="w-6 h-6 text-gray-500" />
                    <Link
                      to={
                        state.profile?.role === "admin"
                          ? "/admin/resetpassword"
                          : "/reset-password"
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Reset Password
                    </Link>
                  </div>

                  {state.profile?.role === "admin" && (
                    <div className="flex flex-row gap-3">
                      <RiAdminLine className="w-6 h-6 text-gray-500" />
                      <Link
                        to="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    </div>
                  )}

                  <div className="w-full border-t border-gray-300 my-2"></div>
                  <div className="flex flex-row gap-3">
                    <SlLogout className="w-6 h-6 text-gray-500" />
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          {/* Desktop Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <button
                  className="px-10 py-2 rounded-full border border-black text-black hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="px-10 py-2 rounded-full bg-[#26231E] text-white hover:bg-[#43403B] transition cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <div className="flex flex-row gap-x-4">
                <div className="border border-gray-300 bg-white px-3 py-3 rounded-full items-center justify-center">
                  <FaRegBell className="w-4 h-4 text-gray-400" />
                </div>

                {/* Desktop Drop Down when logged in */}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 cursor-pointer focus:outline-none">
                        <Avatar className="h-12 w-12">
                          {state.profile?.avatar_url ? (
                            <AvatarImage
                              src={state.profile.avatar_url}
                              alt="Profile"
                              className="object-cover"
                            />
                          ) : (
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <p>{state.profile?.name || "User"}</p>
                        <IoIosArrowDown className="text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-200">
                      <DropdownMenuItem
                        onClick={() => navigate("/member")}
                        className="hover:bg-gray-200 cursor-pointer"
                      >
                        <RxPerson className="w-5 h-5 text-gray-500" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          navigate(
                            state.profile?.role === "admin"
                              ? "/admin/resetpassword"
                              : "/reset-password"
                          )
                        }
                      >
                        <GrPowerReset className="w-5 h-5 text-gray-500" />
                        Reset Password
                      </DropdownMenuItem>

                      {state.profile?.role === "admin" && (
                        <DropdownMenuItem
                          onClick={() => navigate("/admin")}
                          className="hover:bg-gray-200 cursor-pointer"
                        >
                          <RiAdminLine className="w-5 h-5 text-gray-500" />
                          Admin Panel
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <SlLogout className="w-5 h-5 text-gray-500" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
