import { useEffect, useState } from "react";
import axios from "axios";

export function useGetAccessGroups(accessGroupId: string) {
  const [refreshCount, refresh] = useState(0);
  const [accessGroup, setAccessGroup] = useState<{
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
      console.log("- FETCH -");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/access-group/${accessGroupId}`,
        {
          withCredentials: true,
        }
      );

      setAccessGroup({
        loading: false,
        val: res.data,
        err: null,
      });
    }

    fetch();
  }, [refreshCount]);

  return {
    accessGroup,
    refresh,
  };
}
