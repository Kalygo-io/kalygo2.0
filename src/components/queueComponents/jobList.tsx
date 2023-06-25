import { removeJobFromQueue } from "@/services/removeJobFromQueue";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Divider } from "@/components/shared/Divider";
import { useRouter } from "next/router";

interface P {
  jobs: any[];
  fetchCounter: number;
  triggerFetch: Dispatch<SetStateAction<number>>;
}

export const JobList = (p: P) => {
  const { jobs, fetchCounter, triggerFetch } = p;

  const [counter, setCounter] = useState(0); // for triggering a re-render
  const router = useRouter();

  console.log("jobs", jobs);

  return (
    <div className="relative mx-4 sm:mx-6 lg:mx-8">
      {jobs.length === 0 && "No jobs found in queue"}
      {jobs.map((i, idx) => {
        return (
          <div key={idx}>
            <Divider />
            <h4 className="sr-only">Job Status</h4>
            <div>
              <dl>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Filename
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {i?.data?.originalName}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Requested at
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {`${new Date(i?.processedOn)}`}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-6" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${i?.progress}%` }}
                />
              </div>

              <span className="mt-2 isolate inline-flex rounded-md">
                {i?.finishedOn && (
                  <button
                    type="button"
                    className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-red-500 focus:z-10"
                    onClick={() => {
                      console.log("!!!");
                      removeJobFromQueue(i?.id);
                      triggerFetch(fetchCounter + 1);
                    }}
                  >
                    Remove
                  </button>
                )}
                {i?.progress === 100 && i?.returnvalue?.summaryId && (
                  <button
                    type="button"
                    className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-semibold text-blue-500 focus:z-10"
                    onClick={() => {
                      router.push(
                        `/dashboard/summary?summary-id=${i.returnvalue.summaryId}`
                      );
                    }}
                  >
                    View
                  </button>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
