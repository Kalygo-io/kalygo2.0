import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";

export async function getSummarizationQuote(file: File, cb: any) {
  try {
    const formData = new FormData();

    formData.append("file", file);

    // const fileListKeys = Object.keys(fileList);
    // for (let i = 0; i < fileListKeys.length; i++) {
    //   console.log(fileList, fileList[i]);
    //   formData.append("file", fileList[i]);
    // }
    // console.log("formData", formData);
    // console.log("formData", formData.get("file"));

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

    // debugger;

    console.log("getSummarizationQuote", resp);

    cb(get(resp, "data.quote"), get(resp, "data.filePath"));
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when retrieving summarization quote");
  }
}
