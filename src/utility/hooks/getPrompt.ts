import get from "lodash.get";
import React, { useEffect, useState } from "react";
import { getPromptFactory } from "@/serviceFactory/getPromptFactory";

export function useGetPrompt(promptId: number) {
  const [refreshCount, refresh] = useState<number>(0);
  const [prompt, setPrompt] = useState<{
    val: {
      id: number;
      ownerId: number;
      prompt: string;
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
      try {
        const getPromptsRequest = getPromptFactory(promptId);
        const getPromptsResponse = await getPromptsRequest;
        console.log("getPromptsResponse", getPromptsResponse);

        setPrompt({
          loading: false,
          val: get(getPromptsResponse, "data", []),
          err: null,
        });
      } catch (e) {
        setPrompt({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  return {
    prompt,
    refresh,
    refreshCount,
  };
}
