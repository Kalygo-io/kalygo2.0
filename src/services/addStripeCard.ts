import { navigatorLangDetector } from "@/lib/languageDetector";
import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addStripeCard(
  payload: {
    exp_month: string;
    exp_year: string;
    card_number: string;
    cvc: string;
  },
  cb: any
) {
  try {
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/add-stripe-card`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
      withCredentials: true,
    };

    let resp = await axios(config);

    console.log("resp", resp);

    // const detectedLng = languageDetector.detect();
    const detectedLng = navigatorLangDetector();

    cb(resp.data, null);
  } catch (e) {
    errorReporter(e);

    cb(null, e);
  }
}
