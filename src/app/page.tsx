import Head from "next/head";
import Image from "next/image";
import Image1 from "/public/images/logo-dark.png";
import Link from "next/link";
import Footer from "./components/footer";

const Home = () => {
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
            Hello, DevQ!
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
              Ready for the journey ahead?
            </h1>
            <h1 className="text-blue-950 text-2xl font-semibold">
              Let&apos;s start now!
            </h1>
            <div className="flex mt-4">
              <Link href="./login" className="mr-4">
                <button className=" font-semibold bg-indigo-400 text-white px-14 py-2 rounded hover:bg-indigo-700">
                  Login
                </button>
              </Link>
              <Link href="./sign-up">
                <button  className="font-semibold bg-indigo-400 text-white px-14 py-2 rounded hover:bg-indigo-700">
                  Sign up
                </button>
              </Link>
              
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
