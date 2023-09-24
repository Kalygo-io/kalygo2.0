import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function getAccountByIdFactory(id: string) {
  try {
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/${id}`,
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
