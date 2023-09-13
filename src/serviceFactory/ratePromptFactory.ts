import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function ratePromptFactory(
  promptId: number,
  rating: number,
  ratingMax: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rate-prompt/${promptId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        rating,
        ratingMax,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
