import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function downloadAccountContextDocumentFactory(
  id: number,
  accountId: number
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/download-context-document`,
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
