"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    user_email: "",
    user_password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/srs-documents");
      toast.success("login successfull");
    } catch (error: any) {
      console.log("Login failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full  max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md  dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          <>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={(e) =>
                  setUser({ ...user, user_email: e.target.value })
                }
                value={user.user_email}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Password"
                aria-label="Password"
                onChange={(e) =>
                  setUser({ ...user, user_password: e.target.value })
                }
                value={user.user_password}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <Link
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </Link>
              <button
                disabled={loading}
                onClick={onLogin}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {loading ? "..." : "Sign In"}
              </button>
            </div>
          </>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
          </span>
          <Link
            href="/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
