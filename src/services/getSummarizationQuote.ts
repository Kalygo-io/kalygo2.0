import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";

export async function getSummarizationQuote(fileList: File[], cb: any) {
  try {
    console.log("fileList", fileList);

    const formData = new FormData();
    const fileListKeys = Object.keys(fileList);
    for (let i = 0; i < fileListKeys.length; i++) {
      console.log(fileList, fileList[i]);
      formData.append("documents", fileList[i]);
    }

    console.log("formData", formData);
    console.log("formData", formData.get("documents"));

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/get-summarization-quote`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
      withCredentials: true,
    };

    const resp = await axios(config);
    console.log("getSummarizationQuote", resp);

    cb(get(resp, "data.quote"), get(resp, "data.files"));
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when retrieving summarization quote");
  }
}
