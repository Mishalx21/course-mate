'use client';
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import secureLocalStorage from "react-secure-storage";



export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const [isErrorOccured, setIsErrorOccured] = useState(false);

  const checkUser = async (event) => {
    console.log("Checking user");
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are necessary");
      setIsErrorOccured(true);
    } else {
      const req = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email, password: password}),
      });
      const res = await req.json();

      let message = res.message;
      let u_id = res.user_id;
      console.log("User id");
      console.log(u_id);
      let u_name = res.user_name;
      if (message === "Valid user") {
        secureLocalStorage.setItem("u_id", u_id);
        secureLocalStorage.setItem("u_email", email);
        secureLocalStorage.setItem("u_name", u_name);
        console.log("Logged in");
        console.log(u_id);
       console.log(u_name);
        router.push(`/user/${u_id}`); 
      } else {
        setIsErrorOccured(true);
        setError(message);
        setEmail("");
        setPassword("");
        console.log(message);
      }
    }
  };
  useEffect(() => {
    const u=secureLocalStorage.getItem("u_id");
    console.log("use effect");
    console.log(u);
    if (secureLocalStorage.getItem("u_id")) {
      router.push(`/user/${u}`); 
      // router.push("/user");
     // <Link key={u} href={`/user/${u}`} />;
    }
    let handler = () => {
      if (isErrorOccured) {
        setIsErrorOccured(false);
      }
    };
    document.addEventListener("click", handler);
  }, [isErrorOccured]);

  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
        <div className="relative w-[380px] h-[420px] bg-gray-800 rounded-tr-3xl rounded-bl-3xl overflow-hidden">
          <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"></div>
          <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-lime-500 via-lime-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"></div>
          <div className="absolute inset-1 bg-gray-800 rounded-tr-3xl rounded-bl-3xl z-10 p-5">
            <form className="flex-col space-y-8">
              <h2 className="text-xl font-semibold text-lime-500 text-center">
                Log in
              </h2>
              {isErrorOccured && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="relative flex flex-col">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                  autoComplete="email"
                />
                <i className="bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]" />
                <label className="peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Enter Email
                </label>
              </div>
              <div className="relative flex flex-col">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="relative z-10 border-0 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                  autoComplete="current-password"
                />
                <i className="bg-lime-500 rounded w-full bottom-0 left-0 absolute h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]" />
                <label className="peer-focus:font-medium absolute text-sm duration-500 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">
                  Enter Password
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="/forgot-password">
                  <a className="text-lime-500 text-sm font-medium text-primary-600 hover:underline">
                    Forgot password?
                  </a>
                </a>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={checkUser}
                  className="border-solid border-lime-500 border-2 hover:bg-lime-500 rounded-md px-10 py-1.5 tracking-widest font-semibold text-white items-center"
                >
                  Log In
                </button>
              </div>
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a href="/signup">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
