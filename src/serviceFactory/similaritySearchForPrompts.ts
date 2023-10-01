import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function similaritySearchForPrompts(prompt: string) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/prompts/similarity-search`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        prompt,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
