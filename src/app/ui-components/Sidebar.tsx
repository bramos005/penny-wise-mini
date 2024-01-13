"use client"
import { Logo } from "./Logo";
import { Dot } from "./Dot";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { listItems } from "./abstractions/listItems";

export function Sidebar() {
  const pathname = usePathname();
  const [aosInitialized, setAOSInitialized] = useState(false);

  useEffect(() => {
    if (!aosInitialized) {
      AOS.init({
        // Your AOS configuration options here
      });
      setAOSInitialized(true); // Set the flag to indicate initialization
    }
  }, []);

  return (
    <div>
      <div className="bg-custom-white flex flex-col w-60  p-5 h-screen ">
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
                      data-aos={
                        pathname === `/dashboard/${item.title.toLowerCase()}`
                          ? "flip-left"
                          : ""
                      }
                      data-aos-easing={
                        pathname === `/dashboard/${item.title.toLowerCase()}`
                          ? "ease-out-cubic"
                          : ""
                      }
                      data-aos-duration={
                        pathname === `/dashboard/${item.title.toLowerCase()}`
                          ? "400"
                          : ""
                      }
                      className={
                        pathname === `/dashboard/${item.title.toLowerCase()}`
                          ? "text-blue-500 flex gap-3 items-center bg-white rounded-md   p-2   "
                          : "text-dash-gray flex gap-3 items-center"
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

            <li className="flex items-center gap-2">
              <Dot color="bg-blue-400" />
              <p>Assets</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
