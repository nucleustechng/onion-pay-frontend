import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	downnloadTransactions,
	filterTransactions,
	getFilterMoreTransactions,
	getLoadMoreTransactions,
} from "../../modules/TransactionsApi/transactionService";

export function useTransactionHooks() {
	const queryClient = useQueryClient();
	const { mutate: filterMoreMutation, isPending: isFilteringMore } =
		useMutation({
			mutationFn: getFilterMoreTransactions,
			onSuccess: ({ success, records, more }) => {
				if (more && success) {
					queryClient.setQueryData(["transactions"], (prevData: any) => {
						return [...prevData, ...records];
					});
				} else if (!more && success) {
					toast.error("No more transactions to load");
				}
			},
			onError: ({ message }) => {
				toast.error(message);
			},
		});

	const { mutate: loadMoreMutation, isPending: isLoadingMore } = useMutation({
		mutationFn: getLoadMoreTransactions,
		onSuccess: ({ success, records, more }) => {
			if (more && success) {
				queryClient.setQueryData(["transactions"], (prevData: any) => {
					return [...prevData, ...records];
				});
			} else if (!more && success) {
				queryClient.setQueryData(["transactions"], (prevData: any) => {
					return [...prevData, ...records];
				});

				toast.error("No more transactions to load");
			}
		},
		onError: () => {
			console.error(`Error loading`);
			// toast({ title: reason, variant: "destructive" });
		},
	});
	const { mutate: filterMutation, isPending: isFiltering } = useMutation({
		mutationFn: filterTransactions,

		onSuccess: ({ success, records }) => {
			if (success) {
				queryClient.setQueryData(["transactions"], () => {
					return [...records];
				});
			}
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	const { mutate: downloadMutation, isPending: isDownloading } = useMutation({
		mutationFn: downnloadTransactions,
		onSuccess: ({ success, reason }) => {
			if (success === false) {
				toast.error(reason);
			}
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	const downloadTransactions = (payload: { start: number; end: number }) => {
		downloadMutation(payload);
	};

	const filterByDate = (payload: { start: number; end: number }) => {
		filterMutation(payload);
	};

	const handleFilterMore = (payload: {
		start: number;
		end: number;
		last: string;
	}) => {
		filterMoreMutation(payload);
	};

	const handleLoadMore = (last: string) => {
		loadMoreMutation({ last });
	};

	return {
		filterByDate,
		isFiltering,
		downloadTransactions,
		isDownloading,
		isFilteringMore,
		handleFilterMore,
		handleLoadMore,
		isLoadingMore,
	};
}
