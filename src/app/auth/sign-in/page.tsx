"use client";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/navigation"
import AOS from "aos";
import "aos/dist/aos.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  AOS.init();
  
  const  handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataObj = {
      username: username,
      password: password,
    };
    try {
      const res: Response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      if (res.ok) {
        router.push("")
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      data-aos="fade-right"
      className="flex  flex-col items-center justify-center  min-h-screen  ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 text-custom-blue">
        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
        <path
          fillRule="evenodd"
          d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
          clipRule="evenodd"
        />
        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
      </svg>

      <h1 className="text-2xl mb-10 mt-10 font-bold">
        Sign in to your account
      </h1>
      <form onSubmit={handleSignIn} className="flex flex-col">
        <label htmlFor="user-name"></label>
        <input
          className=" p-2 border-2 rounded-md w-72 mb-7"
          placeholder="Username"
          id="user-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
        />

        <label className="mb-2" htmlFor="password"></label>
        <input
          className=" p-2 border-2 rounded-md w-72  mb-7"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />

        <button
          type="submit"
          className="bg-custom-blue rounded-md text-white p-1 cursor-pointer hover:bg-blue-500 ">
          Sign In
        </button>
      </form>
      <div className="flex mt-10 gap-1">
        <p className="text-sm text-gray-500">Not a member?</p>
        <Link href="sign-up">
          <p className="text-sm text-custom-blue font-semibold cursor-pointer hover:text-blue-500">
            Sign up now
          </p>
        </Link>
      </div>
    </div>
  );
}
