import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function addPromptToAccessGroupFactory(
  promptId: number,
  accessGroupId: number
) {
  console.log("promptId", promptId);
  console.log("accessGroupId", accessGroupId);

  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/add-prompt-to-access-group`,
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
