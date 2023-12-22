import { useMutation } from "@tanstack/react-query";
import { downnloadBalances } from "../../modules/balancesApi";
import { toast } from "react-toastify";

export default function useBalanceHooks() {
	const { mutate: downloadMutation, isPending: isDownloading } = useMutation({
		mutationFn: downnloadBalances,
		onSuccess: ({ success, reason }, data) => {
			console.log("reason", data);
			if (success === false) {
				toast.error(reason);
			}
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	const downloadBalanceHistory = (payload: { start: number; end: number }) => {
		downloadMutation(payload);
	};

	return {
		downloadBalanceHistory,
		isDownloading,
	};
}
