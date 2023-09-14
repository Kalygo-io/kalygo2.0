import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function deleteAccessGroupFactory(accessGroupId: number) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/access-group/${accessGroupId}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
