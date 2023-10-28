import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function removeCustomRequestV3FromAccessGroupFactory(
  customRequestV3Id: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/remove-custom-request-v3-from-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        customRequestV3Id,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
