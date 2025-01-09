"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiMegaphoneSimpleLight } from "react-icons/pi";
import useAuthStore from "../../../services/utils/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  const user_name = user?.name;
  const image_url = user?.image_url;
  
  const handleLogout = () => {
    useAuthStore.getState().logoutAccount();
    router.push(`/login`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search triggered");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mt-6">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder=""
            className="border border-gray-600 rounded-full py-2 px-4 outline-none bg-white text-blue-950 pr-10 pl-10 w-full"
            onKeyPress={handleKeyPress}
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950 text-2xl" />
        </div>
        <div className="relative">
          <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2"
            onClick={toggleDropdown}
          >
         {image_url ? (
              <Image
                src={image_url}
                alt="Profile"
                className="rounded-full"
                width={32}
                height={32}
              />
            ) : (
              user_name?.split(' ').map((n) => n[0].toUpperCase()).join('')
            )}
          </div>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="flex flex-col items-center">
                <Link href="/my-profile" passHref>
                  <button className="px-4 py-2 text-blue-950  hover:text-red-400" >
                    My Profile
                  </button>
                </Link>
                <hr className="border-gray-500" />
                <button
                  className="px-4 py-2 text-blue-950  hover:text-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 w-full h-0.5 bg-gray-400"></div>
    </div>
  );
}