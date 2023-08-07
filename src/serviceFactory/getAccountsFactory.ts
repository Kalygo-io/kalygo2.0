import { AccountTableColumns } from "@/types/AccountTableColumns";
import { ColumnDirection } from "@/types/ColumnDirection";
import { errorReporter } from "@/utility/error/reporter";
import axios from "axios";

export async function getAccountsFactory(
  columnToSort: AccountTableColumns,
  direction: ColumnDirection,
  page: number,
  perPage: number
) {
  try {
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/admin/get-accounts?sortBy=${columnToSort}&direction=${direction}&page=${page}&perPage=${perPage}`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    return axios(config);
  } catch (e) {
    errorReporter(e);
  }
}
