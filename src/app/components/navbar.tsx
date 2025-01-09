"use client";
import { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { RxComponent1 } from "react-icons/rx";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiMegaphoneSimpleLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import useAuthStore from '../../../services/utils/authStore';

interface NavbarProps {
  profileImage: string; // Define the type of profileImage as string
}

export default function Navbar({ profileImage }: NavbarProps) {
  const [activeLink, setActiveLink] = useState('');
  const { user } = useAuthStore();
  const userRole = user?.role;

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const getLinkClasses = (link: string) => (
    `flex items-center mb-5 ${activeLink === link ? 'text-red-400' : 'hover:text-red-400 active:text-red-400'}`
  );

  return (
    <div className="w-1/5 min-w-[250px] h-screen bg-white text-blue-950 p-4 flex flex-col border-r border-gray-300">
      <div className="relative rounded-full overflow-hidden w-24 h-24 mx-auto mb-4">
        <Image
          src={profileImage || "/images/logo-light.png"}
          alt="Profile"
          className="w-full h-full object-cover"
          width="150"
          height="150"
        />
      </div>
      <div className="flex-grow ml-7">
        <Link href="/dashboard" legacyBehavior>
          <a onClick={() => handleLinkClick('home')} className={getLinkClasses('home')}>
            <AiOutlineHome className="text-3xl flex-shrink-0" />
            <p className="pl-7 text-base">Dashboard</p>
          </a>
        </Link>
        <Link href="/collections" legacyBehavior>
          <a onClick={() => handleLinkClick('collections')} className={getLinkClasses('collections')}>
            <RxComponent1 className="text-3xl flex-shrink-0" />
            <p className="pl-7 text-base">Collections</p>
          </a>
        </Link>
        {userRole !== 1 && (
          <Link href="/community" legacyBehavior>
            <a onClick={() => handleLinkClick('community')} className={getLinkClasses('community')}>
              <LiaUserFriendsSolid className="text-3xl flex-shrink-0" />
              <p className="pl-7 text-base">Community</p>
            </a>
          </Link>
        )}
        <Link href="/activity" legacyBehavior>
          <a onClick={() => handleLinkClick('activity')} className={getLinkClasses('activity')}>
            <PiMegaphoneSimpleLight className="text-3xl flex-shrink-0" />
            <p className="pl-7 text-base">Activity</p>
          </a>
        </Link>
        <Link href="/settings" legacyBehavior>
          <a onClick={() => handleLinkClick('settings')} className={getLinkClasses('settings')}>
            <IoSettingsOutline className="text-3xl flex-shrink-0" />
            <p className="pl-7 text-base">Settings</p>
          </a>
        </Link>
      </div>
      <div className="text-xs mt-auto">
        <p className="flex justify-center items-center">
          <span className="opacity-80 pr-2">Terms of Use</span>
          <span className="border-r border-blue-950 h-4 inline-block"></span>
          <span className="opacity-80 pl-2">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
