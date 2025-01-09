"use client"
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Image1 from "/public/images/logo-dark.png";
import Link from "next/link";
import Footer from "../components/footer";
import { createUserAndAssignRole } from '../../../services/authServices/authService';
import { createCompany, createUser } from "../../../services/authServices/localAuthService";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>('');
  const [supportEmail, setSupportEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== retypePassword) {
      setError('Passwords do not match');
      return;
    }

    const roleId: any = process.env.NEXT_PUBLIC_ADMIN_ROLE_ID;

    try {
      const userData = {
        email,
        password,
        connection: "Username-Password-Authentication",
        email_verified: true
      };

      const response = await createUserAndAssignRole(userData, roleId);
      console.log("data", response)
      if (response.access_token) {

        const response = await createCompany({ name: companyName, email: supportEmail });
        if (response) {
          await createNewUser(response)
          console.log("responses", response);
        }
        console.log('Response:', response);
      }

    } catch (err: any) {
      console.log("Error", err)
      setError(`An error occurred while signing up.`);
    }
  };

  const createNewUser = async (value: any) => {
    const name = email.split('@')[0];
    const role = 0
    const position = "company owner";
    const company_id = value.data.id
    console.log("company data",);
    const response: any = await createUser({ name: name, email: email, role: role, company_id: company_id, position: position });

    if (response) {
      router.push('/login')
    }

  }
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
            Join our Community!
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
            <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
              <div className="flex flex-col mt-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  placeholder="Company Support Email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  placeholder="Your Own Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="password"
                  placeholder="Retype Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded mt-2 focus:outline-none focus:border-blue-400"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {/* <Link href="./home" className="mt-4"> */}
                <button type="submit" className="font-semibold bg-indigo-400 text-white px-6 py-2 rounded hover:bg-indigo-700 mt-2">
                  Sign up
                </button>
                {/* </Link> */}
              </div>
            </form>
            <div className="flex items-center mt-2">
              <h1 className="text-sm mr-2">Already have an account?</h1>
              <Link href="./login">
                <button className="text-red-700 text-sm">Login</button>
              </Link>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
