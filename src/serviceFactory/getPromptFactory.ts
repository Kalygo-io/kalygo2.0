import { AccountTableColumns } from "@/types/AccountTableColumns";
import { ColumnDirection } from "@/types/ColumnDirection";
import { LoginsTableColumns } from "@/types/LoginsTableColumns";
import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function getPromptFactory(promptId: number) {
  try {
    const config = {
      method: "get",
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
