import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";
// import { useRequestRefundMutation } from "../../../modules/Refunds/refundApi";
// import { useAppDispatch } from "../../../redux/redux-hooks/hooks";
import Input from "../../input fields/Input";
import Loader from "../../Loader";
import { useMutation } from "@tanstack/react-query";
import { requestRefund } from "../../../modules/Refunds/refundService";

interface Props {
	isVisible: boolean;
	onClose: () => {};
}

type RefundForm = {
	t_id: string;
};

const SingleRefundModal = ({ isVisible, onClose }: Props) => {
	// const dispatch = useAppDispatch();

	const [refundInfo, setRefundInfo] = useState<RefundForm>({
		t_id: "",
	});
	// const queryClient = useQueryClient();

	const { mutate: requestRefundMutation, isPending: isRequesting } =
		useMutation({
			mutationFn: requestRefund,
			onSuccess: ({ success, reason }) => {
				if (success === true) {
					toast.success("You have successfully logged your refund.");
					onClose();
				} else {
					toast.error(reason);
				}
			},
			onError: ({ message }) => {
				if (message) {
					toast.error(message);
				}
			},
		});

	const handleSubmit = () => {
		requestRefundMutation({ ...refundInfo });
	};
	//   const [requestRefund, { data: refundData, isSuccess, isLoading }] =
	//   useRequestRefundMutation();

	// const handleRequestRefund = async () => {
	//   try {
	//     if (
	//       refundInfo.t_id &&
	//       refundInfo.partial &&
	//       refundInfo.amount &&
	//       refundInfo.reason
	//     ) {
	//       await requestRefund(refundInfo);
	//     }
	//   } catch (err) {
	//     console.log(err);
	//   }
	// };

	// useEffect(() => {
	// 	if (isSuccess && refundData.success == true) {
	// 		toast.success(
	// 			"You have successfully logged a refund.We will get back to you after 2 business days."
	// 		);

	// 		setTimeout(() => {
	// 			onClose();
	// 		}, 1500);
	// 		setRefundInfo({
	// 			t_id: "",
	// 			partial: true,
	// 			amount: 0,
	// 			reason: "",
	// 		});
	// 	} else {
	// 		toast.error(refundData?.reason);
	// 	}
	// }, [isSuccess, refundData, dispatch]);
	const handleClose = (e: any) => {
		if (e.target.id === "wrapper") {
			onClose();
		}
	};
	if (!isVisible) return null;

	return (
		<div>
			<ToastContainer />
			<div
				className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-50 flex justify-center items-center overflow-y-scroll"
				id="wrapper"
				onClick={handleClose}
			>
				<div className="w-[20rem] md:w-[33rem] h-[15rem]  mt-32 md:mb-56 lg:mb-0 md:mt-0 mb-6 rounded-[0.63rem] bg-white">
					<div className="mx-6 mt-7">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								{/* <FontAwesomeIcon icon={faChevronLeft}/> */}
								<h1 className="text-[#262626] text-lg leading-5 font-WorkSans font-medium">
									Log refund
								</h1>
							</div>
							<div>
								<Image
									src={CloseIcon}
									className="cursor-pointer"
									onClick={() => {
										onClose();
									}}
									alt="Close Icon"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-6 mt-6">
							<div>
								<Input
									name="t_id"
									value={refundInfo.t_id}
									onChange={(e) =>
										setRefundInfo({ ...refundInfo, t_id: e.target.value })
									}
									placeholder="Transaction id"
									label="Transaction ID"
									type="text"
									width="w-[17rem] md:w-[30rem]"
									height="h-[3.13rem]"
								/>
							</div>
							{/* <div>
								<Input
									name="amount"
									value={refundInfo.amount.toString()}
									onChange={(e) =>
										setRefundInfo({
											...refundInfo,
											amount: parseInt(e.target.value),
										})
									}
									width="w-[17rem] md:w-[30rem]"
									height="h-[3.13rem]"
									type="number"
									label="How much do you want to refund"
									placeholder="0.00"
								/>
							</div> */}
							{/* <div className="flex flex-col">
								<Input
									name="reason"
									value={refundInfo.reason}
									onChange={(e) =>
										setRefundInfo({ ...refundInfo, reason: e.target.value })
									}
									width="w-[17rem] md:w-[30rem]"
									height="h-[3.13rem]"
									type="text"
									label="Comments"
									placeholder="Explain the reason for logging this refund"
								/>
				
							</div> */}
							<div className="flex items-center justify-end gap-4 mt-2">
								<button
									onClick={() => onClose()}
									className="flex items-center justify-center w-[5.4rem] h-11 bg-[#F5F5F5] rounded-[0.313rem] text-base text-[#262626] font-WorkSans font-normal leading-5"
								>
									Cancel
								</button>
								<div
									onClick={handleSubmit}
									className="flex justify-center items-center cursor-pointer w-[9.4rem] h-11 bg-[#3063E9] rounded-[0.313rem] text-base text-white font-WorkSans font-normal leading-5"
								>
									{isRequesting ? (
										<Loader isWhite={true} />
									) : (
										<h1>Log refund</h1>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleRefundModal;
