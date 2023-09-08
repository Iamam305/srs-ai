"use client";
import React from "react";
import { useChat } from "ai/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
const Page = () => {
  const [docsInfo, setDocsInfo] = React.useState({
    name: "",
    platform: "",
    description: "",
    features: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const createSrsDoc = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/srs-document", docsInfo);
      console.log("creation successfull", response.data);
      router.push(`/srs-documents/${response.data.document._id}`);
    } catch (error: any) {
      console.log("Creation Unsuccessfull", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      {!loading ? (
        <>
          <section className="max-w-4xl w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
              Create Software Requirment Specifications
            </h2>
            <>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="name"
                  >
                    App Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="tiktok, instagram, shopify, etc"
                    onChange={(e) =>
                      setDocsInfo({ ...docsInfo, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="platform"
                  >
                    Platform
                  </label>
                  <input
                    id="platform"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="android, ios, windows, etc."
                    onChange={(e) =>
                      setDocsInfo({ ...docsInfo, platform: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    placeholder="information about the app"
                    onChange={(e) =>
                      setDocsInfo({ ...docsInfo, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="features"
                  >
                    Features
                  </label>
                  <textarea
                    id="features"
                    placeholder="this is feature 1, this is feature 2"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    onChange={(e) =>
                      setDocsInfo({ ...docsInfo, features: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  disabled={loading}
                  onClick={createSrsDoc}
                  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  {loading ? "Creating" : "Create"}
                </button>
              </div>
            </>
          </section>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
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
