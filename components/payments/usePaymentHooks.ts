import { useMutation } from "@tanstack/react-query";
import { loadFeePayment } from "../../modules/pay/paymentService";
import { toast } from "react-toastify";
// import { useState } from "react";

export function usePaymentHooks() {
	// const queryClient = useQueryClient();
	// const [amountToPay, setAmountToPay] = useState<boolean>(false);

	const {
		mutate: loadFeePayMutation,
		isPending: isLoadingFee,
		data,
		isSuccess,
	} = useMutation({
		mutationFn: loadFeePayment,
		onSuccess: ({ success, client_pays_fee, reason }) => {
			if (success === true && client_pays_fee === true) {
				console.log("Fees are");
			}
			if (success === false) {
				toast.error(reason);
			}
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	const handleLoadPaymentFees = (payload: {
		o_type: string;
		id: string;
		amount: number;
	}) => {
		loadFeePayMutation({ ...payload });
	};

	return {
		handleLoadPaymentFees,
		isLoadingFee,
		data,
		isSuccess,
	};
}
