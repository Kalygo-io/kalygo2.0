import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import { infoToast } from "@/utility/toasts/infoToast";
import axios from "axios";
import { NextRouter } from "next/router";

import { TFunction } from "next-i18next";

export async function deleteAccount(cb: () => void) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
      withCredentials: true,
    };

    let resp = await axios(config);

    console.log("resp", resp);

    cb();
  } catch (e) {
    errorReporter(e);

    // cb(null, e);
  }
}
