import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPromptsFactory } from "@/serviceFactory/getPromptsFactory";
import get from "lodash.get";

export function useGetPromptsWithAccessGroups() {
  const [refreshCount, refresh] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [prompts, setPrompts] = useState<{
    val:
      | {
          id: number;
          ownerId: number;
          prompt: string;
          updatedAt: number;
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
        const getPromptsRequest = getPromptsFactory();
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
    setPrompts,
    refresh,
    refreshCount,
    query,
    setQuery,
  };
}
