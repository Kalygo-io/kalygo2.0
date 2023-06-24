import axios from "axios";
import { errorToast } from "@/utility/toasts";

export async function summarizeFiles(
  files: { key: string; originalName: string }[],
  quote: number,
  cb: any
) {
  try {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/summarize`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        // ...formData,
        files,
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
