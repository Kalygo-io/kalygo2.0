import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addSummaryV3ToAccessGroupFactory(
  summaryV3Id: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-summary-v3-to-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        summaryV3Id,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
