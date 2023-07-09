import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";
import { TFunction } from "next-i18next";

export async function getAccountPaymentMethodsFactory() {
  try {
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-account-payment-methods`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
