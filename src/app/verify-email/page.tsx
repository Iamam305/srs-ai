"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <section className=" max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-2xl">
        <h2 className="font-semibold text-gray-800 dark:text-white">
          Email Verified
        </h2>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        email verified successfully
          <a href="#" className="text-blue-500 hover:underline">
            Read cookies policies
          </a>
          .{" "}
        </p>
        <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          
          <Link href={'/login'} className=" inline-block text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
