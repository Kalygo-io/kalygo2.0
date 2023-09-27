import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function getAccountContextDocumentsFactory(accountId: number) {
  try {
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-context-documents/${accountId}`,
      headers: {
        "Content-Type": "multipart/form-data",
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
