import Image from "next/image";
import { Logo } from "./ui-components/Logo";
import { HomePageNav } from "./ui-components/HomePageNav";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <div>
        <HomePageNav></HomePageNav>
      </div>

      <div className="flex items-center justify-center h-screen">
        {" "}
        {/* Full viewport height */}
        <Link href="dashboard/overview">
          <button className="w-[10rem] bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
