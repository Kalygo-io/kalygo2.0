import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function rateSummaryFactory(
  summaryId: number,
  rating: number,
  ratingMax: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rate-summary-v2/${summaryId}`,
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
