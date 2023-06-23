import axios from "axios";
import { errorToast } from "@/utility/toasts";

export async function summarizeFiles(filePath: string, quote: number, cb: any) {
  try {
    // const formData = new FormData();
    // const fileListKeys = Object.keys(fileList);

    // for (let i = 0; i < fileListKeys.length; i++) {
    //   console.log(fileList, fileList[i]);
    //   formData.append("file", fileList[i]);
    // }

    // console.log("formData", formData);
    // console.log("formData", formData.get("file"));

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summarize`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        // ...formData,
        filePath,
        amount: quote,
      },
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
      withCredentials: true,
    };

    const resp = await axios(config);

    cb(resp, null);
  } catch (e) {
    cb(null, e);
    console.error(e);
    errorToast("Error occurred when performing summarization");
  }
}
