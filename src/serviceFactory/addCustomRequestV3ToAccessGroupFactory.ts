import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addCustomRequestV3ToAccessGroupFactory(
  customRequestV3Id: number,
  accessGroupId: number
) {
  console.log("customRequestV3Id", customRequestV3Id);
  console.log("accessGroupId", accessGroupId);

  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-custom-request-v3-to-access-group`,
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
