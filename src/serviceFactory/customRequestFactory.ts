import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";
import { errorReporter } from "@/utility/error/reporter";

export async function customRequestFactory(prompt: string, fileList: File[]) {
  try {
    console.log("fileList", fileList);

    const formData = new FormData();
    const fileListKeys = Object.keys(fileList);
    for (let i = 0; i < fileListKeys.length; i++) {
      console.log(fileList, fileList[i]);
      formData.append("documents", fileList[i]);
    }

    formData.set("customPrompt", prompt);

    // console.log("formData", formData);
    // console.log("formData", formData.get("documents"));

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/custom-request`,
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
    console.error(e);
    errorToast("Error occurred when executing custom request");
    errorReporter(e);
  }
}
