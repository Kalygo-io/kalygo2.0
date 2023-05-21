import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts/infoToast";
import axios from "axios";
import { NextRouter } from "next/router";

import { TFunction } from "next-i18next";

export async function signOut(router: NextRouter, t: TFunction) {
  try {
    var config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/sign-out`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
      withCredentials: true,
    };

    let resp = await axios(config);

    console.log("resp", resp);

    infoToast(t("toast-messages:sign-out-success"));

    // const detectedLng = languageDetector.detect();
    const detectedLng = navigatorLangDetector();

    router.push(`/${detectedLng}/`);
  } catch (e) {
    errorReporter(e);
  }
}
