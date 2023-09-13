import get from "lodash.get";
import { useEffect, useState } from "react";
import { getPromptFactory } from "@/serviceFactory/getPromptFactory";

export function useGetPrompt() {
  const [refreshCount, refresh] = useState<number>(0);
  const [prompts, setPrompts] = useState<{
    val:
      | {
          id: number;
          ownerId: number;
          prompt: string;
        }[]
      | null;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        const getPromptsRequest = getPromptFactory();
        const getPromptsResponse = await getPromptsRequest;
        console.log("getPromptsResponse", getPromptsResponse);

        setPrompts({
          loading: false,
          val: get(getPromptsResponse, "data", []),
          err: null,
        });
      } catch (e) {
        setPrompts({
          loading: false,
          val: [],
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  return {
    prompts,
    refresh,
    refreshCount,
  };
}
