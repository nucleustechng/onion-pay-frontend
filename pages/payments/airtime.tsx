import React from "react";
import Header from "../../components/Header";
import { Button } from "../../@/components/ui/button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { XIcon } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	buyAirtime,
	getMobileOperators,
} from "../../modules/TransactionsApi/transactionService";
import Input from "../../components/input fields/Input";
import { toast } from "react-toastify";
import { ReloadIcon } from "@radix-ui/react-icons";

const airtime = () => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const { data: mobileOperators } = useQuery({
		queryKey: ["mobile-operators"],
		queryFn: getMobileOperators,
	});

	const { mutate: buyAirtimeMutation, isPending } = useMutation({
		mutationFn: buyAirtime,
		onSuccess: ({ success, reason }) => {
			if (success === true) {
				toast.success(reason);
			} else {
				toast.error(reason);
			}
			// Invalidate and refetch
			//   queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
		onError: ({ message }) => {
			toast.error(message);
		},
	});

	function handleBuyAirtime() {
		buyAirtimeMutation({ ...airtimeDetails });
	}

	type TAirtime = {
		phone_number: string;
		amount: number;
		mobile_operator_id: string;
	};

	const [airtimeDetails, setAirtimeDetails] = useState<TAirtime>({
		phone_number: "",
		amount: 0,
		mobile_operator_id: "",
	});
	return (
		<div>
			<div>
				<Header mainText="Airtime purchase" />

				<div className="w-[21rem] md:w-[27.65rem]">
					<h1 className="text-[2rem] text-[#262626] font-WorkSans font-normal leading-9">
						You have not made any airtime purchases yet.
					</h1>
				</div>
				<Button
					onClick={() => {
						openModal();
					}}
					className="mr-2 md:mr-0 ml-2 md:ml-0 mt-6"
				>
					<h1 className="text-base font-WorkSans font-normal text-white">
						Buy Airtime
					</h1>
					<FontAwesomeIcon
						icon={faPlus}
						className="w-5 h-5 ml-4 text-base text-white"
					/>
				</Button>
			</div>
			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={closeModal}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										<div className="flex items-center justify-between">
											<h1>Airtime purchase</h1>
											<XIcon />
										</div>
									</Dialog.Title>
									<div className="flex flex-col gap-6 mt-2">
										<div>
											<Input
												name="phone_number"
												value={airtimeDetails?.phone_number}
												onChange={(e) =>
													setAirtimeDetails({
														...airtimeDetails,
														phone_number: e.target.value,
													})
												}
												label="Phone number"
												type="text"
												width="w-full"
											/>
										</div>
										<div>
											<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2">
												Select Provider
											</h1>
											<div className="relative ">
												<select
													className="w-full h-[3.313rem]  focus:caret-primary outline-none 
                            rounded-[0.313rem] border-[0.0625rem] border-[#CACACA] pl-4 
                            text-sm text-[#898989] font-WorkSans font-normal leading-4"
													onChange={(e) => {
														setAirtimeDetails({
															...airtimeDetails,
															mobile_operator_id: e.target.value,
														});
													}}
												>
													{/* <option value="">{bankDetails?.bank}</option> */}
													{mobileOperators?.map((operator: any, index: any) => (
														<option
															key={index}
															value={operator?.mobileOperatorCode}
														>
															{operator?.name}
														</option>
													))}
												</select>
												<FontAwesomeIcon
													icon={faChevronDown}
													className="w-5 h-5 absolute top-[1rem] right-[1.1rem]"
												/>
											</div>
										</div>

										<div className="flex flex-col ">
											<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4 mb-2">
												Amount
											</h1>
											<div className="">
												{/* <div className='flex justify-center gap-2 md:justify-between px-5 items-center border-[0.07rem]  border-solid border-[#CACACA] md:gap-0 rounded-[0.315rem] w-[5rem] md:w-[7.15rem] h-[3.15rem]'>
                                <h1 className='text-base text-[#262626] font-WorkSans font-normal leading-5'>NGN</h1>
                                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5"/>
                                </div> */}
												<div>
													<input
														name="amount"
														value={airtimeDetails?.amount}
														onChange={(e) =>
															setAirtimeDetails({
																...airtimeDetails,
																amount: parseFloat(e.target.value),
															})
														}
														type="number"
														inputMode="numeric"
														placeholder="0.00"
														className="flex px-5 items-center border-[0.07rem] outline-none  border-solid border-[#CACACA] rounded-[0.315rem] w-[19rem] md:w-[29.9rem] h-[3.15rem]"
													/>
												</div>
											</div>
											<h1 className="mt-1 text-sm text-[#1B1A1A] font-WorkSans font-medium leading-4 ">
												Enter desired amount to purchase
											</h1>
										</div>
									</div>

									<div className="flex justify-end mt-4">
										<Button
											onClick={handleBuyAirtime}
											className="mr-2 md:mr-0 ml-2 md:ml-0 mt-6"
										>
											<h1 className="text-base font-WorkSans font-normal text-white">
												Buy Airtime
											</h1>
											{isPending ? (
												<ReloadIcon className="ml-4 text-white animate-spin" />
											) : null}
											{/* <FontAwesomeIcon
												icon={faPlus}
												className="w-5 h-5 ml-4 text-base text-white"
											/> */}
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default airtime;
