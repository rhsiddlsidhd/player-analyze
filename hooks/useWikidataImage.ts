"use client";
import { fetcher } from "@/lib/swr";
import useSWR from "swr";

const useWikidataImage = (id: string) => {
  const { data, isLoading } = useSWR(`/api/wikidata/image?q=${id}`, fetcher);
  return { data, isLoading };
};

export default useWikidataImage;
