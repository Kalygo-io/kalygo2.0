import axios from "axios";
import { errorToast } from "@/utility/toasts";

export async function retryJob(jobId: Number) {
  try {
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/retry-job`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        jobId,
      },
      withCredentials: true,
    };

    const resp = await axios(config);

    return resp;
  } catch (e) {
    console.error(e);
    errorToast("Error occurred when retrying job");
  }
}
