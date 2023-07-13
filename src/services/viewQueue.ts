import axios from "axios";
import { errorToast } from "@/utility/toasts";

export async function viewQueue() {
  try {
    var config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/view-queue`,
      headers: {
        "Content-Type": "application/json",
      },
      onUploadProgress: (e: any) => {
        console.log("onUploadProgress", e);
      },
      withCredentials: true,
    };

    const resp = await axios(config);

    return resp;
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when viewing queue");
  }
}
