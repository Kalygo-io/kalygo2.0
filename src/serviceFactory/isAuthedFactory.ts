import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function isAuthedFactory() {
  try {
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/auth/is-authed`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
