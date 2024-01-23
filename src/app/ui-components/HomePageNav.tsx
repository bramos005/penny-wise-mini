import { Logo } from "./Logo"
import Image from "next/image"
export function HomePageNav() {

    return (
        <div className="flex justify-between items-center ">

            <div className="pl-10 pt-5">
                <Logo color={"text-custom-blue"} icon={"text-custom-blue"}></Logo>
            </div>

            <ul className="flex gap-8 pt-5 items-center pr-10">
                <li className="text-black font-semibold cursor-pointer hover:text-[#F0F0F0] hover:scale-105 transition-all duration-300 ease-in-out">Login</li>

                <li className="border font-semibold rounded-3xl px-[13px] cursor-pointer py-[5px] text-white bg-custom-blue hover:bg-blue-500 hover:scale-[1.04] transition-all duration-300 ease-in-out">Sign Up</li>
            </ul>
            

      </div>
  )
}
