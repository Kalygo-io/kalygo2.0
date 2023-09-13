import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function removePromptFromAccessGroupFactory(
  promptId: number,
  accessGroupId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/remove-prompt-from-access-group`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        promptId,
        accessGroupId,
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
