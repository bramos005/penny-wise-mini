import Image from "next/image";
import { Logo } from "./ui-components/Logo";
import { HomePageNav } from "./ui-components/HomePageNav";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <div>
        <HomePageNav></HomePageNav>
      </div>


      <div className="flex items-center justify-center h-screen"> {/* Full viewport height */}
  <button className="w-[10rem] bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
    Get Started
  </button>
</div>


      {/* <main className=" flex  justify-center flex-wrap   text-white gap-20 items-center mt-[10rem] sm:">
        <div className="flex flex-col   gap-5">
          <h2 className="text-[2rem] text-semibold flex it">
            Plan. Spend. <p className="ml-3 text-custom">Save.</p>
          </h2>
         
          <p className="w-96 text-semibold text-xl  ">
            Discover a simpler way to budget and save. With Penny Wise,
            you're not just tracking expenses – you're paving the path to
            financial freedom. Effortless, intuitive, and smart – your journey
            towards smarter spending starts here.
          </p>

          <button className="self-center w-[10rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
            Get Started
        </button>
        </div>
        <div>
        
        </div>

        <div className="flex border-[10px] border-trans-white rounded-lg">
          <Image
            src={"/dash.png"}
            width={600}
            height={200}
            alt="dashboard-img"
          />
        </div>
      </main> */}
    </div>
  );
}
