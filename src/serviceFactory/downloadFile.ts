import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function downloadFileFactory(id: number) {
  try {
    // const config = {
    //   method: "get",
    //   url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/download-file`,

    //   onUploadProgress: (e: any) => {
    //     console.log("onUploadProgress", e);
    //   },
    //   responseType: "blob",
    //   withCredentials: true,
    // };

    return axios.get(
      `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/download-file/${id}`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    // return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
