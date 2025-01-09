import { ReactNode } from 'react';
import Header from "../../components/header";
import Navbar from "../../components/navbar";

interface MainLayoutProps {
  children: ReactNode; // Define children prop with ReactNode type
}

export default function MainLayout({ children }: MainLayoutProps) {
  const profileImage = "/images/logo-light.png"; // Provide the path to the profile image

  return (
    <div className="flex h-screen">
        <div className="flex-grow overflow-auto">
          {children}
        </div>
    </div>
  );
}
