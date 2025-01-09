"use client";
import React, { useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import Image1 from "/public/images/logo-dark.png";
import Link from "next/link";
import Footer from "../components/footer";
import { loginWithEmailPassword } from '../../../services/authServices/authService';
import { getUserDetails } from '../../../services/authServices/localAuthService';
import useAuthStore from '../../../services/utils/authStore';
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authResult, setAuthResult] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await loginWithEmailPassword(email, password);
      if(result.access_token){
        const response = await getUserDetails({email});
        if(response){
          useAuthStore.getState().setUser(response);
          router.push('/dashboard');
        }
        
      }
      setAuthResult(result);
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Split Screen</title>
        <meta
          name="description"
          content="Basic vertically split screen with Next.js and Tailwind CSS"
        />
      </Head>
      <div className="relative h-screen">
        <div className="absolute left-10">
          <Image alt="Logo" src={Image1} width={200} height={150} />
          <h1 className="text-white text-4xl font-mono font-thin mt-9 ml-4">
            Welcome to DevQ!
          </h1>
          <pre className="text-gray-400 text-left p-4">
            {`#include <iostream>
using namespace std;

int main() {
  cout << "Hello, DevQ!" << endl;
  return 0;
}`}
          </pre>
        </div>
        <div className="flex h-full">
          <div className="bg-blue-950 w-2/3"></div>
          <div className="bg-white w-1/2 flex flex-col justify-center items-center text-center">
            <h1 className="text-blue-950 text-2xl font-semibold">
              Your journey awaits!
            </h1>
            <div className="flex flex-col mt-4">
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
              />
              <button
                className="font-semibold bg-indigo-400 text-white pl-20 pr-20 py-2 rounded hover:bg-indigo-700 mt-4"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="flex items-center mt-2">
              <h1 className="text-sm mr-2">Don&#39;t have an account?</h1>
              <Link href="./sign-up">
                <button className="text-red-700 text-sm">Sign up</button>
              </Link>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
