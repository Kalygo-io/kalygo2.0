import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addAccountToAccessGroupFactory(
  email: string,
  accessGroupId: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-account-to-access-group/${accessGroupId}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        email,
      },
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
