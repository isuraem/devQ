import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: "DevQ",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
