import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { errorReporter } from "@/utility/error/reporter";
import get from "lodash.get";
import React, { useState } from "react";
import { ShareModal } from "./components/shareModal";
import { useTranslation } from "next-i18next";
import { Bars3Icon, LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { ratePromptFactory } from "@/serviceFactory/ratePromptFactory";
import { SlideOver } from "./components/slideover";

interface P {
  prompt: any;
  account?: any;
  refresh?: any;
  refreshCount?: number;
  showSharing?: boolean;
}

export const Prompt = (p: P) => {
  const { prompt, refresh, account, refreshCount, showSharing } = p;
  const { t } = useTranslation();
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  return (
    <div className="xl:mr-96">
      {/* Main area */}
      <div className="w-full flex justify-between fixed bg-white lg:pr-[calc(18rem)] xl:pr-[calc(42rem)] shadow-sm">
        <h3 className="p-4 text-3xl font-bold text-gray-900 whitespace-nowrap truncate">
          Prompt
        </h3>
        {showSharing && (
          <div className="flex mr-4 xl:hidden">
            <button
              onClick={() => {
                setSlideOverOpen(true);
              }}
            >
              <Bars3Icon className="h-8 w-8" />
            </button>
          </div>
        )}
        {/* <div className="m-4 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-100" />
            </div>
          </div> */}
      </div>
      <div className="px-4 pt-[calc(6.25rem)] text-sm leading-6 text-gray-700 overflow-x-scroll min-h-screen">
        <pre>{prompt?.prompt}</pre>
      </div>

      <div
        id="custom-request-aside"
        className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 xl:block bg-white"
      >
        <div className="mt-6">
          {showSharing && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/prompt/share?prompt-id=${prompt.id}`
                  );
                }}
              >
                <LinkIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => {
                  setShareModalOpen(true);
                }}
              >
                <ShareIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          <dl className="divide-y divide-gray-100 space-y-10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("dashboard-page:summary.requested")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                {prompt?.createdAt
                  ? `${new Date(prompt.createdAt)}`
                  : t("dashboard-page:summary.time-requested-unknown")}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Rating
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                <div className="flex items-end">
                  <RadioGroupStars
                    rating={get(prompt, "Ratings.0.rating", null)}
                    maxRating={get(prompt, "Ratings.0.maxRating", null)}
                    recordRating={async (rating: number, ratingMax: number) => {
                      try {
                        // prettier-ignore
                        const rateSummaryRequest = ratePromptFactory(prompt.id, rating, ratingMax);
                        // prettier-ignore
                        const rateSummaryResponse = await rateSummaryRequest;
                        // prettier-ignore
                        console.log("rateSummaryResponse", rateSummaryResponse);
                      } catch (e) {
                        errorReporter(e);
                      }
                    }}
                  />
                </div>
              </dd>
            </div>
            {/* {prompt.prompt && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("dashboard-page:custom-request.prompt")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0 truncate">
                  {prompt?.prompt}
                </dd>
              </div>
            )} */}
          </dl>
        </div>
      </div>
      <ShareModal
        account={account}
        refresh={refresh}
        refreshCount={refreshCount || 0}
        prompt={prompt}
        open={shareModalOpen}
        cb={(isOpen: boolean) => {
          setShareModalOpen(isOpen);
        }}
      />
      <SlideOver
        showOpen={slideOverOpen}
        setShowOpen={setSlideOverOpen}
        prompt={prompt}
      />
    </div>
  );

  // return (
  //   <div className="py-2 mx-auto max-w-4xl">
  //     <div className="mx-auto flex justify-end space-x-2 max-w-4xl">
  //       {showSharing && (
  //         <>
  //           <button
  //             onClick={() => {
  //               navigator.clipboard.writeText(
  //                 `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/prompt/share?prompt-id=${prompt.id}`
  //               );
  //             }}
  //           >
  //             <LinkIcon className="h-6 w-6" />
  //           </button>
  //           <button
  //             onClick={() => {
  //               setShareModalOpen(true);
  //             }}
  //           >
  //             <ShareIcon className="h-6 w-6" />
  //           </button>
  //         </>
  //       )}
  //     </div>
  //     <p className="text-3xl tracking-tight text-gray-700">{prompt.prompt}</p>
  //     <div className="mt-4 flex gap-x-6 w-40">
  //       <RadioGroupStars
  //         rating={get(prompt, "Ratings.0.rating", null)}
  //         maxRating={get(prompt, "Ratings.0.maxRating", null)}
  //         recordRating={async (rating: number, ratingMax: number) => {
  //           try {
  //             // prettier-ignore
  //             const ratePromptRequest = ratePromptFactory(prompt.id, rating, ratingMax);
  //             // prettier-ignore
  //             const ratePromptResponse = await ratePromptRequest;
  //             // prettier-ignore
  //             console.log("ratePromptResponse", ratePromptResponse);
  //           } catch (e) {
  //             errorReporter(e);
  //           }
  //         }}
  //       />
  //     </div>

  //     <ShareModal
  //       account={account}
  //       refresh={refresh}
  //       refreshCount={refreshCount || 0}
  //       prompt={prompt}
  //       open={shareModalOpen}
  //       cb={(isOpen: boolean) => {
  //         setShareModalOpen(isOpen);
  //       }}
  //     />
  //   </div>
  // );
};
