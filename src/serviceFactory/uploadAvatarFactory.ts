import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function uploadAvatarFactory(accountId: number, file: File) {
  try {
    console.log("accountId", accountId);
    console.log("avatar", file);

    const formData = new FormData();

    formData.append("accountId", accountId.toString());
    formData.append("avatar", file);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/upload-avatar`,
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
