import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function deletePrompt(promptId: number) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/prompt/${promptId}`,
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
