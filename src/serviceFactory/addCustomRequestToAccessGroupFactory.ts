import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addCustomRequestToAccessGroupFactory(
  customRequestId: number,
  accessGroupId: number
) {
  console.log("customRequestId", customRequestId);
  console.log("accessGroupId", accessGroupId);

  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-custom-request-to-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        customRequestId,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
