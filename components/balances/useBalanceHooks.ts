import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  downnloadBalances,
  getLoadmoreBalances,
} from "../../modules/balancesApi";
import { toast } from "react-toastify";
import { useState } from "react";

export default function useBalanceHooks() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const queryClient = useQueryClient();

  const { mutate: downloadMutation, isPending: isDownloading } = useMutation({
    mutationFn: downnloadBalances,
    onSuccess: ({ success, reason }) => {
      if (success === false) {
        toast.error(reason);
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { mutate: loadMoreMutation, isPending: isLoadingMore } = useMutation({
    mutationFn: getLoadmoreBalances,
    onSuccess: ({ success, balances, more }) => {
      function paginateArray<T>(array: T[], itemsPerPage: number): T[][] {
        const pages: T[][] = [];

        for (let i = 0; i < array.length; i += itemsPerPage) {
          const page = array.slice(i, i + itemsPerPage);
          pages.push(page);
        }

        return pages;
      }
      if (more && success) {
        queryClient.setQueryData(["balances"], (prevData: any) => {
          const updateData = [...prevData, ...balances];
          const itemsPerPage = 50;

          const paginatedPages = paginateArray(updateData, itemsPerPage);

          queryClient.setQueryData(
            ["transactions"],
            paginatedPages[pageNumber],
          );
        });
      } else if (!more && success) {
        queryClient.setQueryData(["balances"], (prevData: any) => {
          const updateData = [...prevData, ...balances];
          const itemsPerPage = 50;

          const paginatedPages = paginateArray(updateData, itemsPerPage);
          queryClient.setQueryData(["balances"], paginatedPages[pageNumber]);
        });

        toast.error("No more transactions to load");
      }
    },
    onError: () => {
      console.error(`Error loading`);
      // toast({ title: reason, variant: "destructive" });
    },
  });

  const downloadBalanceHistory = (payload: { start: number; end: number }) => {
    downloadMutation(payload);
  };

  const handleLoadMore = (last: string) => {
    loadMoreMutation({ last });
  };

  return {
    downloadBalanceHistory,
    isDownloading,
    handleLoadMore,
    setPageNumber,
    pageNumber,
    isLoadingMore,
  };
}
