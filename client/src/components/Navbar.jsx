import React from 'react';
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="md:text-xl text-base font-semibold text-gray-700">Orathai.Blog</div>

          {/* Mobile Drop Down Menu */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline"><RxHamburgerMenu /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border border-[#d6d3cb] text-[#75716B]" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                Log in
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                Sign up
              </DropdownMenuItem>
              </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          {/* Buttons */}
          <div className="hidden md:flex space-x-3">
            <button className="px-10 py-2 rounded-full border border-black text-black hover:bg-gray-100 transition">
              Log in
            </button>
            <button className="px-10 py-2 rounded-full bg-[#26231E] text-white hover:bg-[#43403B] transition">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar