import React, {
  RefObject,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  Ref,
} from "react";
import axios from "axios";

export function usePurchaseHistory() {
  const [refreshCount, refresh] = useState(0);
  const [purchaseHistory, setPurchaseHistory] = useState<{
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
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/account/get-purchase-history`,
        {
          withCredentials: true,
        }
      );

      setPurchaseHistory({
        loading: false,
        val: res.data,
        err: null,
      });
    }

    fetch();
  }, []);

  return {
    purchaseHistory,
    refresh,
  };
}
