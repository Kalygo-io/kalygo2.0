import { RadioGroupStars } from "@/components/shared/RatingComponent";
import { errorReporter } from "@/utility/error/reporter";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import get from "lodash.get";
import React from "react";

interface P {
  prompt: any;
  account?: any;
  refresh?: any;
  refreshCount?: number;
  showSharing?: boolean;
}

export const Prompt = (p: P) => {
  const { prompt } = p;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {prompt.prompt}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
        Created: {new Date(prompt.updatedAt).toLocaleString()}
      </p>
      <div className="mx-auto mt-6 flex items-center justify-center gap-x-6 w-40">
        <RadioGroupStars
          rating={get(prompt, "Ratings.0.rating", null)}
          maxRating={get(prompt, "Ratings.0.maxRating", null)}
          recordRating={async (rating: number, ratingMax: number) => {
            try {
                        // prettier-ignore
                        // const rateSummaryRequest = rateCustomRequestFactory(customRequest.id, rating, ratingMax);
                        // prettier-ignore
                        // const rateSummaryResponse = await rateSummaryRequest;
                        // prettier-ignore
                        // console.log("rateSummaryResponse", rateSummaryResponse);
                      } catch (e) {
              errorReporter(e);
            }
          }}
        />
        {/* <a
          href="#"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Learn more <span aria-hidden="true">→</span>
        </a> */}
      </div>
    </div>
  );
};
