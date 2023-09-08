"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [Docs, setDocs] = useState<[any] | []>([]);
  useEffect(() => {
    getDocs();
  }, []);
  const getDocs = async () => {
    const res = await axios.get("/api/srs-document");
    setDocs(res.data.srsDocs);
    console.log(res);
  };
  return (
    <div className="container py-10">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {Docs?.map((doc) => (
          <div
            key={doc._id}
            className=" w-full max-w-lg p-6   bg-white rounded-md shadow dark:bg-gray-900"
          >
            <Link
              href={`/srs-documents/${doc._id}`}
              className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
            >
              {doc.appName}
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              {doc.description}
            </p>
            <p className="mt-3 text-sm text-blue-500">{doc.createdAt}</p>
          </div>
        ))}
        {Docs.length ==0 ? (
          <>
            <section className=" max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800  dark:border-gray-700 rounded-2xl">
              <h2 className="font-semibold text-gray-800 dark:text-white">
                No Document Found
              </h2>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Create New document to continue .{" "}
              </p>
              <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
                <Link
                  href={"/srs-documents/create"}
                  className=" inline-block text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
                >
                  Create
                </Link>
              </div>
            </section>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Page;
