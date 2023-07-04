import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";

export async function similaritySearchWithQueue(
  query: string,
  file: File,
  cb: any
) {
  try {
    const formData = new FormData();

    // const fileListKeys = Object.keys(fileList);
    // for (let i = 0; i < fileListKeys.length; i++) {
    //   console.log(fileList, fileList[i]);
    //   formData.append("file", fileList[i]);
    // }

    formData.append("file", file);
    formData.append("query", query);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/similarity-search-with-queue`,
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

    console.log("similaritySearch", resp);

    cb(get(resp, "data.results"));
  } catch (e) {
    cb(null, e);
    console.error(e);
    errorToast("Error occurred when performing similarity search");
  }
}
