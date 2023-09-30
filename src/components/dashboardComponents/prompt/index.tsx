import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { errorReporter } from "@/utility/error/reporter";
import get from "lodash.get";
import React, { useState } from "react";
import { ShareModal } from "./components/shareModal";
import { useTranslation } from "next-i18next";
import { LinkIcon, ShareIcon } from "@heroicons/react/24/outline";
import { ratePromptFactory } from "@/serviceFactory/ratePromptFactory";

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

  return (
    <div className="py-2 mx-auto max-w-4xl">
      <div className="mx-auto flex justify-end space-x-2 max-w-4xl">
        {showSharing && (
          <>
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
          </>
        )}
      </div>
      <p className="text-3xl tracking-tight text-gray-700">{prompt.prompt}</p>
      {/* <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
        Created: {new Date(prompt.updatedAt).toLocaleString()}
      </p> */}
      <div className="mt-4 flex gap-x-6 w-40">
        <RadioGroupStars
          rating={get(prompt, "Ratings.0.rating", null)}
          maxRating={get(prompt, "Ratings.0.maxRating", null)}
          recordRating={async (rating: number, ratingMax: number) => {
            try {
              // prettier-ignore
              const ratePromptRequest = ratePromptFactory(prompt.id, rating, ratingMax);
              // prettier-ignore
              const ratePromptResponse = await ratePromptRequest;
              // prettier-ignore
              console.log("ratePromptResponse", ratePromptResponse);
            } catch (e) {
              errorReporter(e);
            }
          }}
        />
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
    </div>
  );
};
