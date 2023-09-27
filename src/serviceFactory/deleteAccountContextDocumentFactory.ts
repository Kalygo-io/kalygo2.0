import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function deleteAccountContextDocumentFactory(
  id: number,
  accountId: number
) {
  try {
    const config = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/delete-context-document`,
      data: {
        id: id,
        accountContextId: accountId,
      },
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
      withCredentials: true,
    };

    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
