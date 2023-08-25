import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function removeSummaryFromAccessGroupFactory(
  summaryId: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/remove-summary-from-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        summaryId,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
