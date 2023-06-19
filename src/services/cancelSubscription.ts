import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts/infoToast";
import axios from "axios";
import { NextRouter } from "next/router";

import { TFunction } from "next-i18next";

export async function cancelSubscription(
  subscriptionId: string,
  cb: () => void
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/cancel-subscription`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        subscriptionId,
      },
      withCredentials: true,
    };

    let resp = await axios(config);

    console.log("resp", resp);

    cb();
  } catch (e) {
    errorReporter(e);
  }
}
