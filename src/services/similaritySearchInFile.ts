import axios from "axios";
import { errorToast } from "@/utility/toasts";
import get from "lodash.get";

export async function similaritySearchInFile(
  query: string,
  fileList: any,
  cb: any
) {
  try {
    const formData = new FormData();

    const fileListKeys = Object.keys(fileList);
    for (let i = 0; i < fileListKeys.length; i++) {
      console.log(fileList, fileList[i]);
      formData.append("file", fileList[i]);
    }

    formData.append("query", query);

    // console.log("formData", formData);
    // console.log("formData", formData.get("file"));

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/similarity-search`,
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

    console.log("similaritySearch", resp);

    cb(get(resp, "data.results"));
  } catch (e) {
    console.error(e);
    errorToast(
      "Error occurred when retrieving performing similarity search quote"
    );
  }
}
