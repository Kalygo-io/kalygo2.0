import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function newAccessGroupFactory(name: string) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
