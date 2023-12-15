import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	downnloadTransactions,
	filterTransactions,
	getFilterMoreTransactions,
	getLoadMoreDebitTrans,
	getLoadMoreTransactions,
	searchCreditTransactions,
	searchDebitTransactions,
} from "../../modules/TransactionsApi/transactionService";
import { useState } from "react";

export function useTransactionHooks() {
	const queryClient = useQueryClient();
	const [pageNumber, setPageNumber] = useState<number>(0);
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
			function paginateArray<T>(array: T[], itemsPerPage: number): T[][] {
				const pages: T[][] = [];

				for (let i = 0; i < array.length; i += itemsPerPage) {
					const page = array.slice(i, i + itemsPerPage);
					pages.push(page);
				}

				return pages;
			}
			if (more && success) {
				queryClient.setQueryData(["transactions"], (prevData: any) => {
					const updateData = [...prevData, ...records];
					const itemsPerPage = 50;

					const paginatedPages = paginateArray(updateData, itemsPerPage);

					queryClient.setQueryData(
						["transactions"],
						paginatedPages[pageNumber]
					);
				});
			} else if (!more && success) {
				queryClient.setQueryData(["transactions"], (prevData: any) => {
					const updateData = [...prevData, ...records];
					const itemsPerPage = 50;

					const paginatedPages = paginateArray(updateData, itemsPerPage);
					queryClient.setQueryData(
						["transactions"],
						paginatedPages[pageNumber]
					);
				});

				toast.error("No more transactions to load");
			}
		},
		onError: () => {
			console.error(`Error loading`);
			// toast({ title: reason, variant: "destructive" });
		},
	});

	const { mutate: loadMoreDebitMutation, isPending: isLoadingMoreDebit } =
		useMutation({
			mutationFn: getLoadMoreDebitTrans,
			onSuccess: ({ success, records, more }) => {
				function paginateArray<T>(array: T[], itemsPerPage: number): T[][] {
					const pages: T[][] = [];

					for (let i = 0; i < array.length; i += itemsPerPage) {
						const page = array.slice(i, i + itemsPerPage);
						pages.push(page);
					}

					return pages;
				}
				if (more && success) {
					queryClient.setQueryData(["debits"], (prevData: any) => {
						const updateData = [...prevData, ...records];
						const itemsPerPage = 50;

						const paginatedPages = paginateArray(updateData, itemsPerPage);

						queryClient.setQueryData(["debits"], paginatedPages[pageNumber]);
					});
				} else if (!more && success) {
					queryClient.setQueryData(["debits"], (prevData: any) => {
						const updateData = [...prevData, ...records];
						const itemsPerPage = 50;

						const paginatedPages = paginateArray(updateData, itemsPerPage);
						queryClient.setQueryData(["debits"], paginatedPages[pageNumber]);
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

	const { mutate: searchCreditMutation, isPending: isCreditSearching } =
		useMutation({
			mutationFn: searchCreditTransactions,
			onSuccess: ({ success, records, reason }) => {
				if (success === true) {
					queryClient.setQueryData(["transactions"], () => {
						return [...records];
					});
				} else {
					toast.error(reason);
				}
			},
			onError: ({ message }) => {
				toast.error(message);
			},
		});

	const { mutate: searchDebitMutation, isPending: isDebitSearching } =
		useMutation({
			mutationFn: searchDebitTransactions,
			onSuccess: ({ success, records, reason }) => {
				if (success === true) {
					queryClient.setQueryData(["debits"], () => {
						return [...records];
					});
				} else {
					toast.error(reason);
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

	const handleLoadMoreDebit = (last: string) => {
		loadMoreDebitMutation({ last });
	};

	const handleCreditSearch = (terms: string) => {
		searchCreditMutation({ terms });
	};
	const handleDebitSearch = (terms: string) => {
		searchDebitMutation({ terms });
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
		setPageNumber,
		pageNumber,
		handleCreditSearch,
		handleDebitSearch,
		isCreditSearching,
		isDebitSearching,
		isLoadingMoreDebit,
		handleLoadMoreDebit,
	};
}
