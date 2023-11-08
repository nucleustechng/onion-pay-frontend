import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { filterTransactions } from "../../modules/TransactionsApi/transactionService";

export function useTransactionHooks() {
	const queryClient = useQueryClient();
	const { mutate: filterMutation, isPending: isFiltering } = useMutation({
		mutationFn: filterTransactions,

		onSuccess: ({ success, records }) => {
			if (success) {
				queryClient.setQueryData(["transactions"], (prevData: any) => {
					return [...prevData, ...records];
				});
			}
			// else if (!more && success) {
			//     queryClient.setQueryData(["transactions"], (prevData: any) => {
			//         return [...prevData, ...records];
			//     });
			//     toast({
			//         title: "No more transactions to load",
			//         variant: "destructive",
			//     });
			// }
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	const filterByDate = (payload: { start: number; end: number }) => {
		filterMutation(payload);
	};

	return {
		filterByDate,
		isFiltering
	}
}
