import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function rateCustomRequestV3Factory(
  customRequestV3Id: number,
  rating: number,
  ratingMax: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rate-custom-request-v3/${customRequestV3Id}`,
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
