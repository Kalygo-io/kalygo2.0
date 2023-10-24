import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function removeSummaryV3FromAccessGroupFactory(
  summaryV3Id: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/remove-summary-v3-from-access-group`,
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
