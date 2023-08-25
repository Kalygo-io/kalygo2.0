import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addSummaryToAccessGroupFactory(
  summaryId: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-summary-to-access-group`,
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
