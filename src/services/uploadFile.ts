import axios from "axios";
import { errorToast } from "@/utility/toasts";

export async function uploadFile(fileList: any, cb: any) {
  try {
    const formData = new FormData();

    const fileListKeys = Object.keys(fileList);

    for (let i = 0; i < fileListKeys.length; i++) {
      console.log(fileList, fileList[i]);
      formData.append("file", fileList[i]);
    }

    console.log("formData", formData);
    console.log("formData", formData.get("file"));

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summarize`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
    };

    const resp = await axios(config);

    cb(resp);
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when performing summarization");
  }
}
