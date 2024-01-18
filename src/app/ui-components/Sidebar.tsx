"use client";
import { Logo } from "./Logo";
import { Dot } from "./Dot";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { listItems } from "./abstractions/listItems";

export function Sidebar() {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const [aosInitialized, setAOSInitialized] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (!aosInitialized) {
      AOS.init();
      setAOSInitialized(true);
    }
  }, []);

  return (
    <div data-aos="" className="">
      <div
        
        onClick={handleToggle}
        className={` ${
          toggle ? "left-[11rem] top-[.5rem]" : "absolute"
        } fixed cursor-pointer p-4 z-[1000] 900:hidden`}>
        {!toggle && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8">
            <path
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        )}

        {toggle && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <div className={`${toggle ? "" : "hidden"}  900:flex`}>
        <div className="bg-custom-white flex flex-col w-60  p-5 h-screen fixed ">
          <Logo />
          <h2 className="mt-7 text-custom-gray mb-3">MAIN MENU</h2>
          <div>
            <div>
              <ul className="flex flex-col gap-4 ">
                {listItems.map((item) => {
                  return (
                    <Link
                      key={item.title + 678678}
                      href={`${item.title.toLowerCase()}`}>
                      <li
                        key={item.title + (Math.random() * 1000).toString()}
                        className={
                          pathname === `/dashboard/${item.title.toLowerCase()}`
                            ? "text-blue-500 flex gap-3 items-center bg-white rounded-md   p-2   "
                            : "text-dash-gray flex gap-3 items-center  "
                        }>
                        {item.icon}
                        <p>{item.title}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="mt-7 text-custom-gray mb-3">BUCKETS CATEGORY</h2>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <Dot color="bg-green-400" />
                <p>Incomes</p>
              </li>

              <li className="flex items-center gap-2">
                <Dot color="bg-red-400" />
                <p>Debts</p>
              </li>

              <li className="flex items-center gap-2">
                <Dot color="bg-orange-400" />
                <p>Bills</p>
              </li>

              <li className="flex items-center gap-2">
                <Dot color="bg-purple-400" />
                <p>Investments</p>
              </li>

              <li className="flex items-center  gap-2">
                <Dot color="bg-blue-400" />
                <p>Assets</p>
              </li>
              <li className=" group fixed bottom-5 flex items-center border-t-[1px] ml-[-1.2rem] pl-3 pt-3 w-[14.9rem] bg-custom-white text-dash-gray gap-2 hover:text-custom-blue transition-all duration-500  ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-dash-gray  group-hover:text-custom-blue transition-all duration-500  ease-in-out">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <SignOutButton />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
