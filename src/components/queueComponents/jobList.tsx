import { removeJobFromQueue } from "@/services/removeJobFromQueue";
import React from "react";

interface P {
  jobs: any[];
}

export const JobList = (p: P) => {
  const { jobs } = p;

  console.log("jobs", jobs);

  return (
    <>
      {jobs.length === 0 && "No jobs found in queue"}
      {jobs.map((i, idx) => {
        return (
          <div key={idx}>
            <h4 className="sr-only">Status</h4>
            <p className="text-sm font-medium text-gray-900">
              {i.data.key} {i.data.originalName}
            </p>
            <div className="mt-6" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${i.progress}%` }}
                />
              </div>

              <span className="mt-2 isolate inline-flex rounded-md">
                <button
                  type="button"
                  className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-red-500 focus:z-10"
                  onClick={() => {
                    removeJobFromQueue(i.id);
                  }}
                >
                  Remove
                </button>
              </span>
              <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                {/* <div className="text-blue-600">Copying files</div>
                <div className="text-center text-blue-600">
                  Migrating database
                </div>
                <div className="text-center">Compiling assets</div>
                <div className="text-right">Deployed</div> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
  // <div className="px-4 sm:px-6 lg:px-8 flex flex-col flex-center justify-center">
  //   <div className="min-w-0 flex-1">
  //     <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
  //       Jobs
  //     </h2>
  //   </div>
};
