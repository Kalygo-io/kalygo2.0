import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function purchaseCreditsFactory(
  card: {
    card_number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    name: string;
  },
  credits: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/purchase-credits`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        card,
        credits,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
