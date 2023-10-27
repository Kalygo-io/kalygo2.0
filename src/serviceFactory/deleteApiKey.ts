import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function deleteApiKeyFactory(secretId: string) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/delete-api-key`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        secretId,
      },
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
