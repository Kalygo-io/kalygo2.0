import React, {
  RefObject,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  Ref,
} from "react";
import axios from "axios";

export function useReferralCodes() {
  const [refreshCount, refresh] = useState(0);
  const [referralCodes, setReferralCodes] = useState<{
    val: any;
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
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-referral-codes`,
        {
          withCredentials: true,
        }
      );

      setReferralCodes({
        loading: false,
        val: res.data,
        err: null,
      });
    }

    fetch();
  }, []);

  return {
    referralCodes,
    refresh,
  };
}
