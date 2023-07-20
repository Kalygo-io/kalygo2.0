import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";
import { errorReporter } from "@/utility/error/reporter";

export async function customSummaryFactory(
  customizations: Record<string, string>,
  fileList: File[]
) {
  try {
    console.log("fileList", fileList);
    console.log("customizations", customizations);

    const formData = new FormData();
    const fileListKeys = Object.keys(fileList);
    for (let i = 0; i < fileListKeys.length; i++) {
      console.log(fileList, fileList[i]);
      formData.append("documents", fileList[i]);
    }

    formData.set("format", customizations["format"]);
    formData.set("type", customizations["type"]);
    formData.set("length", customizations["length"]);
    formData.set("language", customizations["language"]);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summarize-v2`,
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
    errorToast("Error occurred when executing custom summary");
    errorReporter(e);
  }
}
