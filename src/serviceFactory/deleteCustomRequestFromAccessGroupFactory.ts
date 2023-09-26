import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function deleteCustomRequestFromAccessGroupFactory(
  customRequestId: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/delete-custom-request-from-access-group/${accessGroupId}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        customRequestId,
      },
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
