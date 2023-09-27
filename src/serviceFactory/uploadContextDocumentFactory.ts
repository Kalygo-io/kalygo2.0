import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function uploadContextDocumentFactory(
  accountId: number,
  file: File
) {
  try {
    const formData = new FormData();

    formData.append("accountId", accountId.toString());
    formData.append("contextDocument", file);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/upload-context-document`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
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
