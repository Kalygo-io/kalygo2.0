import React, {
  RefObject,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  Ref,
} from "react";
import axios from "axios";
import { SupportedApiKeys } from "@/types/SupportedApiKeys";

export function useGetAccount() {
  const [refreshCount, refresh] = useState(0);
  const [account, setAccount] = useState<{
    val: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      subscriptionPlan: string;
      subscriptions: any[];
      summaryCredits: number;
      vectorSearchCredits: number;
      customRequestCredits: number;
      usageCredits: number;
      profilePicture: string;
      AwsSecretsManagerApiKey: {
        accountId: number;
        id: number;
        secretId: string;
        type: SupportedApiKeys;
        preview: string;
      }[];
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
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account`,
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
  }, [refreshCount]);

  return {
    account,
    refresh,
  };
}
