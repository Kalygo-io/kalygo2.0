import axios from "axios";
import { errorToast } from "@/utility/toasts";
// import get from "lodash.get";
import { errorReporter } from "@/utility/error/reporter";

export async function ragRequestWithQueueFactory(
  customizations: Record<string, string | boolean> | null,
  file: File
) {
  try {
    console.log("customizations", customizations);
    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);
    formData.set("prompt", customizations?.prompt! as string);
    formData.set("model", customizations?.model! as string);

    // console.log("formData", formData);
    // console.log("formData", formData.get("documents"));

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rag-request-with-queue`,
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
    errorToast("Error occurred when executing R.A.G. request");
    errorReporter(e);
  }
}
