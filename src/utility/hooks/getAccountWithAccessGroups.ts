import React, {
  RefObject,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  Ref,
} from "react";
import axios from "axios";

export function useGetAccountWithAccessGroups() {
  const [refreshCount, refresh] = useState(0);
  const [account, setAccount] = useState<{
    val: {
      email: string;
      firstName: string;
      lastName: string;
      subscriptionPlan: string;
      subscriptions: any[];
      summaryCredits: number;
      vectorSearchCredits: number;
      customRequestCredits: number;
      usageCredits: number;
      accessGroups: any[];
    } | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-account-with-access-groups`,
        {
          withCredentials: true,
        }
      );

      setAccount({
        loading: false,
        val: res.data,
        err: null,
      });
    }

    fetch();
  }, []);

  return {
    account,
    refresh,
  };
}
