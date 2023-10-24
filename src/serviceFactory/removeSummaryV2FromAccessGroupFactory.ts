import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function removeSummaryV2FromAccessGroupFactory(
  summaryV2Id: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/remove-summary-v2-from-access-group`,
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
