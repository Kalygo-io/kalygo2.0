import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addSummaryV2ToAccessGroupFactory(
  summaryV2Id: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-summary-v2-to-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        summaryV2Id,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
