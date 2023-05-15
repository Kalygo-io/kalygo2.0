import axios from "axios";
import { errorToast } from "@/utility/toasts/errorToast";
// SHOUTOUT https://fettblog.eu/typescript-typing-catch-clauses/

export function errorReporter(err: any) {
  if (typeof err === "string") {
    // The error is a string
    console.error(err);
    errorToast(err.toString());
  } else if (axios.isAxiosError(err)) {
    // axios does an error check for us!
    console.error(err);
    errorToast(err.toString());
  } else {
    // everything else
    console.error(err);
    errorToast(err.toString());
  }
}
