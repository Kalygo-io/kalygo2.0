import { toast } from "react-toastify";

export function infoToast(
  message: string,
  position: "top-right" | "bottom-right" = "top-right"
) {
  toast(message, {
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
