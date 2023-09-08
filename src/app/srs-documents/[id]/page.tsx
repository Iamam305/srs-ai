"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [DocDetails, setDocDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDocData();
  }, []);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(DocDetails?.document);
  };
  const getDocData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/srs-document/${params.id}`);
      setDocDetails(res.data.srsDoc);
    } catch (error: any) {
      toast.error(error.message);
      router.push("/srs-documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!loading ? (
        <div className="flex  items-center">
          <div className="max-w-4xl w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 my-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                {DocDetails?.createdAt}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-xl  text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 ">
                App Name - {DocDetails?.appName}
              </p>

              <p className="text-xl  text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 ">
                Platforms - {DocDetails?.platform}
              </p>

              <p className="text-xl  text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 ">
                Description - {DocDetails?.description}
              </p>

              <p className="text-xl  text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 ">
                Features - {DocDetails?.features}
              </p>

              <div className="flex justify-end w-full">
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Copy
                </button>
              </div>
              <pre className="mt-5 text-gray-600 dark:text-gray-300 whitespace-pre-wrap bg-black p-4 rounded-md">
                {DocDetails?.document}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center">Building Your Srs Document</h3>
          <div className="w-full max-w-md mx-auto animate-pulse p-9">
            <h2 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600" />
            <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
            <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
