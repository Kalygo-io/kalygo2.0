import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";

export async function performOcrOnDocumentFactory(file: File) {
  try {
    const formData = new FormData();

    // const fileListKeys = Object.keys(fileList);
    // for (let i = 0; i < fileListKeys.length; i++) {
    //   console.log(fileList, fileList[i]);
    //   formData.append("file", fileList[i]);
    // }

    formData.append("file", file);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/ocr/process-doc`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
      withCredentials: true,
    };

    console.log("performing OCR...");

    return axios(config);
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when performing similarity search");
  }
}
