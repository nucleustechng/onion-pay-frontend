import NextImage from "next/image";
import React, { Fragment, useCallback, useRef, useState } from "react";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
// import dynamic from "next/dynamic";
import InfoCircle from "../../Assets/icon/InfoCircle.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
// import UpgradeWalletModal from "./modals/UpgradeWalletModal";
import { useLoadWalletQuery } from "../../modules/WalletApi";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "../../Assets/icon/CloseIcon.svg";
// import DocumentModal from "./modals/DocumentModal";
// import IdentificationModal from "./modals/IdentificationModal";
// import AddressModal from "./modals/Address";
import Webcam from "react-webcam";
import { Button } from "../../@/components/ui/button";
import { ArrowRightIcon, CalendarIcon, ChevronLeftIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../@/components/ui/select";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../@/components/ui/popover";
import { cn } from "../../@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../@/components/ui/calendar";
import { toast } from "react-toastify";
import Loader from "../Loader";
// import { upgradeWalletTest } from "../../modules/upgradeWallet";
import Cookies from "js-cookie";
import axios from "axios";

const Balance = () => {
	// const [showModal, setShowModal] = useState<boolean>(false);
	// One
	const webcamRef = useRef<Webcam>(null);
	const [capturedImage, setCapturedImage] = useState<any>();
	const [imageToDisplay, setImageToDisplay] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [steps, setSteps] = useState<number>(0);

	const hiddenSelfieInput: any = React.useRef(null);
	const handleSelfieClick = () => {
		hiddenSelfieInput.current?.click();
	};

	function dataURLtoFile(dataURL: any, filename: any) {
		const arr = dataURL.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	}

	const captureImage = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		setImageToDisplay(imageSrc);
		if (imageSrc) {
			const file = dataURLtoFile(imageSrc, "captured_image.jpg");
			setCapturedImage(file);
		}
	}, []);

	// Two

	const [fileAdded2, setFileAdded2] = useState<boolean>(false);
	const [fileAdded3, setFileAdded3] = useState<boolean>(false);

	const [utilityBill, setUtilityBill] = useState(null);
	const [signature, setSignature] = useState(null);

	const hiddenFileInput2: any = React.useRef(null);
	const handleClick2 = () => {
		hiddenFileInput2.current?.click();
	};

	//   const [selectedImage2, setSelectedImage2] = useState<any>();

	// This function will be triggered when the file field change
	const imageChange2 = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFileAdded2(true);
			setUtilityBill(selectedFile);

			// setSelectedImage(selectedFile);
			// setBusinessInfo(prevState => ({
			//     ...prevState,
			//     file: selectedFile
			// }));
		}
	};

	const hiddenFileInput3: any = React.useRef(null);
	const handleClick3 = () => {
		hiddenFileInput3.current?.click();
	};

	//   const [selectedImage2, setSelectedImage2] = useState<any>();

	// This function will be triggered when the file field change
	const imageChange3 = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			setFileAdded3(true);
			setSignature(selectedFile);

			// setSelectedImage(selectedFile);
			// setBusinessInfo(prevState => ({
			//     ...prevState,
			//     file: selectedFile
			// }));
		}
	};

	// Three
	const [fileAdded1, setFileAdded1] = useState<boolean>(false);
	const [document, setDocument] = useState(null);
	const [date, setDate] = useState<any>();
	const [date1, setDate1] = useState<any>();
	const [idType, setIdType] = useState("");

	const hiddenFileInput1: any = React.useRef(null);
	const handleClick1 = () => {
		hiddenFileInput1.current?.click();
	};

	//   const [selectedImage1, setSelectedImage1] = useState<any>();

	// This function will be triggered when the file field change
	const imageChange1 = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];

			setFileAdded1(true);
			setDocument(selectedFile);
		}
	};

	// const hiddenFileInput2: any = React.useRef(null);
	// const handleClick2 = () => {
	// 	hiddenFileInput2.current?.click();
	// };

	//   const [selectedImage2, setSelectedImage2] = useState<any>();

	// This function will be triggered when the file field change
	// const imageChange2 = (e: any) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const selectedFile = e.target.files[0];
	// 		setFileAdded2(true);

	// 		// setSelectedImage(selectedFile);
	// 		// setBusinessInfo(prevState => ({
	// 		//     ...prevState,
	// 		//     file: selectedFile
	// 		// }));
	// 	}
	// };

	const handleIdTypeChange = (value: string) => {
		setIdType(value);
	};

	const [idNumber, setIdNumber] = useState("");

	const handleDate = (e: any) => {
		setDate(e.getTime());
	};

	const handleDate1 = (e: any) => {
		setDate1(e.getTime());
	};

	// Four
	const [address, setAddress] = useState({
		houseNumber: 0,
		streetName: "",
		city: "",
		localGovernment: "",
		state: "",
		nearestLandmark: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setAddress({ ...address, [name]: value });
	};

	// const [upgradeWallet, { data: upgradeWalletData, isSuccess, isLoading }] =
	// 	useUpgradeWalletMutation();
	// console.log("data", upgradeWalletData);
	// useEffect(() => {
	// 	if (isSuccess && upgradeWalletData?.success == true) {
	// 		toast.success(upgradeWalletData?.reason);
	// 		// nextFunc();
	// 	} else if (isSuccess && upgradeWalletData?.success == false) {
	// 		toast.error(upgradeWalletData?.reason);
	// 	} else {
	// 		toast.error(upgradeWalletData?.reason);
	// 	}
	// }, [isSuccess]);

	//  Step 1
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const dispatch = useAppDispatch();
	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);

	const { data: walletData } = useLoadWalletQuery();

	const walletBalance = walletData
		? walletData["wallet"]?.balance_string
		: "--";
	const walletNumber = walletData ? walletData["wallet"]?.walletNumber : "--";
	const walletName = walletData ? walletData["wallet"]?.walletName : "---";

	// const FundBalanceModal = dynamic(() => import("./modals/FundBalanceModal"));
	const upgradeWallet = async () => {
		setIsLoading(true);
		try {
			const token = Cookies.get("token");
			const formDataObject = new FormData();

			if (capturedImage) {
				formDataObject.append("selfie", capturedImage);
			}
			if (signature) {
				formDataObject.append("signature", signature);
			}
			if (utilityBill) {
				formDataObject.append("utilityBill", utilityBill);
			}
			if (document) {
				formDataObject.append("document", document);
			}
			if (idType) {
				formDataObject.append("idType", idType);
			}
			if (date) {
				formDataObject.append("idIssueDate", date);
			}
			if (date1) {
				formDataObject.append("idExpiryDate", date1);
			}
			if (idNumber) {
				formDataObject.append("idNumber", idNumber);
			}
			if (address) {
				formDataObject.append("houseNumber", address?.houseNumber.toString());
			}
			if (address) {
				formDataObject.append("streetName", address?.streetName);
			}
			if (address) {
				formDataObject.append("city", address?.city);
			}
			if (address) {
				formDataObject.append("localGovernment", address?.localGovernment);
			}
			if (address) {
				formDataObject.append("state", address?.state);
			}
			if (address) {
				formDataObject.append("nearestLandmark", address?.nearestLandmark);
			}

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_URL}/api/v1/upgrade-wallet`,
				formDataObject,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (data.success === true) {
				setIsLoading(false);
				closeModal();
				setCapturedImage("");
				setIdType("");
				setIdNumber("");
				setDate("");
				setDate1("");
				toast.success(
					"Upgrade request successful. An email will be sent when your wallet is upgraded."
				);
				return data;
			} else {
				setIsLoading(false);
				toast.error(data?.reason);
			}
		} catch (error) {
			setIsLoading(false);
			console.error("Error occurred during upgrade request:", error);
			toast.error("An error occurred. Please try again later.");
		}
	};

	return (
		<div className="">
			<div className=" mx-6 mt-6">
				<div className="flex justify-between items-center mb-12">
					<h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
						Balance
					</h1>
					{!sidebarShow && (
						<div
							className="lg:hidden"
							onClick={() => dispatch(setShowSidebar(true))}
						>
							<NextImage
								src={Hamburger}
								alt="Hamburger Icon"
							/>
						</div>
					)}
				</div>
				<div className="flex items-center justify-between pb-2">
					<div>
						<h1 className="text-[1.25rem] text-[#1B1A1A]">NGN balance</h1>
					</div>
					{/* <div className="flex items-center gap-4">
						<button className="w-[8.3rem] h-11 text-sm text-[#1B1A1A] font-WorkSans font-normal leading-5 bg-[#F5F5F5] rounded-[0.32rem]">
							Set low limit
						</button>
						<button
							className="w-[8.65rem] h-11 text-sm text-white font-WorkSans font-normal leading-5 bg-[#3063E9] rounded-[0.32rem]"
							onClick={() => {
								setShowModal(true);
							}}
						>
							Fund balance
						</button>
					</div> */}
				</div>
				<hr className="border-[#898989]" />
				<div>
					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Name
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletName}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />

					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Balance
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletBalance}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />
					<div className="flex items-center px-4 justify-between h-[3.8rem]">
						<h1 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							Account Number
						</h1>
						<h2 className="text-sm text-[#262626] font-WorkSans font-normal leading-5">
							{walletNumber}
						</h2>
					</div>
					<hr className="border-[#F5F5F5]" />
				</div>
				<div
					onClick={openModal}
					className="flex items-center gap-2 cursor-pointer mt-5"
				>
					<div className="flex items-center gap-1">
						<NextImage
							src={InfoCircle}
							width={14}
							height={14}
							alt="Info circle icon"
						/>
						<h1 className="text-primary text-xs font-WorkSans font-normal leading-4">
							Upgrade Wallet
						</h1>
					</div>
					<FontAwesomeIcon
						icon={faArrowRight}
						className="w-5 h-5 text-primary"
					/>
				</div>
				{/* <div>
					<FundBalanceModal
						isVisible={showModal}
						onClose={async () => setShowModal(false)}
					/>
				</div> */}
			</div>
			{/* Modals */}
			{/* Step 1 */}
			<Transition
				appear
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => {}}
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
						<div className="fixed inset-0 bg-black bg-opacity-25" />
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
									{steps === 0 && (
										<div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-6 ">
													{/* <ChevronLeftIcon /> */}

													<h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
														Upgrade your wallet
													</h1>
												</div>
												<div>
													<NextImage
														src={CloseIcon}
														className="cursor-pointer"
														onClick={closeModal}
														alt="Close Icon"
													/>
												</div>
											</div>
											<div>
												<div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6 ">
													<div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] ">
														<h1 className="text-primary text-sm font-WorkSans font-normal leading-4 ">
															Step 1 of 4
														</h1>
													</div>
													<div className="">
														<h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
															Take a selfie
														</h1>
													</div>
												</div>
											</div>
											<div className="">
												<div>
													<div className="flex justify-center mt-6">
														<div className="flex justify-center w-full bg-[#1B1A1A]">
															<div className="flex flex-col">
																<h1 className="text-white text-center text-sm font-WorkSans font-normal leading-4 mt-4">
																	Fit your face in the space bellow
																</h1>
																<div className="relative w-[14.9rem] h-[22rem] border-[#FF9635] border-[0.0625rem] rounded-full overflow-hidden mt-4">
																	<NextImage
																		src={imageToDisplay}
																		width={238.4}
																		height={352}
																		className="object-cover w-full h-full"
																		alt="Captured"
																	/>
																	{/* {imageToDisplay ? (
																	
																	) : (
																		<Webcam
																			audio={false}
																			mirrored={true}
																			ref={webcamRef}
																			screenshotFormat='image/jpeg'
																			className="object-cover w-full h-full"
																		/>
																	)} */}
																</div>
															</div>
														</div>
													</div>
													<div className="flex justify-center mt-6">
														{!capturedImage ? (
															<Button
																onClick={handleSelfieClick}
																className="w-full text-white"
															>
																Upload
																<input
																	type="file"
																	name="file"
																	className="hidden"
																
																	onChange={imageChange2}
																	ref={hiddenSelfieInput}
																/>
															</Button>
														) : (
															<div className="flex flex-col w-full gap-4">
																<Button
																	onClick={captureImage}
																	className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
																>
																	Retake Photo
																</Button>
																<Button
																	onClick={() => setSteps(1)}
																	className="w-full text-white"
																>
																	Next
																</Button>
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									)}
									{steps === 1 && (
										<div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-6 ">
													<ChevronLeftIcon
														className="cursor-pointer"
														onClick={() => setSteps(0)}
													/>

													<h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
														Upgrade your wallet
													</h1>
												</div>
												<div>
													<NextImage
														src={CloseIcon}
														className="cursor-pointer"
														onClick={closeModal}
														alt="Close Icon"
													/>
												</div>
											</div>
											<div>
												<div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6 ">
													<div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] ">
														<h1 className="text-primary text-sm font-WorkSans font-normal leading-4 ">
															Step 2 of 4
														</h1>
													</div>
													<div className="">
														<h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
															Documents
														</h1>
													</div>
												</div>
											</div>
											<div>
												<div
													className="flex flex-col gap-2 mt-6 cursor-pointer"
													onClick={handleClick2}
												>
													<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
														Upload an image of your most recent utility bill
													</h1>
													<div className="flex items-center justify-between px-6  h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]">
														<h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
															{fileAdded2 ? "File added" : "Select file"}
														</h1>
														<FontAwesomeIcon
															icon={faPlus}
															className="w-5 h-5"
														/>
													</div>
													<input
														type="file"
														name="file"
														className="hidden"
														onChange={imageChange2}
														ref={hiddenFileInput2}
													/>
												</div>
												<h1 className="text-xs text-[#898989] font-WorkSans pt-1">
													Only JPG or PNG format
												</h1>
												<div
													className="flex flex-col gap-2 mt-6 cursor-pointer"
													onClick={handleClick3}
												>
													<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
														Upload an image of your signature
													</h1>
													<div className="flex items-center justify-between px-6  h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]">
														<h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
															{fileAdded3 ? "File added" : "Select file"}
														</h1>
														<FontAwesomeIcon
															icon={faPlus}
															className="w-5 h-5"
														/>
													</div>
													<input
														type="file"
														name="file"
														className="hidden"
														onChange={imageChange3}
														ref={hiddenFileInput3}
													/>
												</div>
												<h1 className="text-xs text-[#898989] font-WorkSans pt-1">
													Only JPG or PNG format
												</h1>
												<div className="flex justify-end">
													<Button
														onClick={() => setSteps(2)}
														className="w-[94px] text-white mt-6"
													>
														Next
														<ArrowRightIcon className="w-5 h-5 ml-2" />
													</Button>
												</div>
											</div>
										</div>
									)}{" "}
									{steps === 2 && (
										<div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-6 ">
													<ChevronLeftIcon
														className="cursor-pointer"
														onClick={() => setSteps(1)}
													/>

													<h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
														Upgrade your wallet
													</h1>
												</div>
												<div>
													<NextImage
														src={CloseIcon}
														className="cursor-pointer"
														onClick={closeModal}
														alt="Close Icon"
													/>
												</div>
											</div>
											<div>
												<div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6 ">
													<div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] ">
														<h1 className="text-primary text-sm font-WorkSans font-normal leading-4 ">
															Step 3 of 4
														</h1>
													</div>
													<div className="">
														<h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
															Identification
														</h1>
													</div>
												</div>
											</div>
											<div>
												<div>
													<div>
														<div>
															<Select
																onValueChange={(value: string) =>
																	handleIdTypeChange(value)
																}
															>
																<SelectTrigger className="w-full  h-[3.13rem] mt-6 px-6 border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]">
																	<SelectValue placeholder="Select ID Type" />
																</SelectTrigger>
																<SelectContent className="w-[332px] md:w-[400px] bg-slate-100 px-4">
																	<SelectGroup className="flex flex-col gap-2 py-2">
																		<SelectItem value="nic">
																			National Identity Card
																		</SelectItem>
																		<SelectItem value="dlc">
																			{`Driver's License`}
																		</SelectItem>
																		<SelectItem value="vtc">
																			{`Voter's Card`}
																		</SelectItem>
																		<SelectItem value="ipp">
																			International Passport
																		</SelectItem>
																	</SelectGroup>
																</SelectContent>
															</Select>
														</div>
														<div
															className="flex flex-col gap-2 mt-6 cursor-pointer"
															onClick={handleClick1}
														>
															<h1 className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																Valid ID
															</h1>
															<div className="flex items-center justify-between px-6  h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]">
																<h1 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
																	{fileAdded1 ? "File added" : "Select file"}
																</h1>
																<FontAwesomeIcon
																	icon={faPlus}
																	className="w-5 h-5 opacity-50"
																/>
															</div>
															<input
																type="file"
																name="file"
																className="hidden"
																onChange={imageChange1}
																ref={hiddenFileInput1}
															/>
														</div>
														<h1 className="text-xs text-[#898989] font-WorkSans pt-1">
															Only JPG or PNG format
														</h1>
													</div>

													<div className="flex flex-col gap-2  mt-6">
														<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
															ID number
														</Label>
														<Input
															type="text"
															id="idNumber"
															placeholder=""
															name="idNumber"
															onChange={(e: any) => setIdNumber(e.target.value)}
															className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
														/>
													</div>
													<div className="flex flex-col gap-2 mt-6">
														<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
															Issue date
														</Label>
														<Popover>
															<PopoverTrigger asChild>
																<Button
																	variant={"outline"}
																	className={cn(
																		"w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] justify-start text-left font-normal",
																		!date && "text-muted-foreground"
																	)}
																>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{date ? (
																		format(date, "PPP")
																	) : (
																		<span>Pick a date</span>
																	)}
																</Button>
															</PopoverTrigger>
															<PopoverContent
																className="w-auto p-0"
																align="start"
															>
																<Calendar
																	mode="single"
																	selected={date}
																	onSelect={handleDate}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
													</div>
													<div className="flex flex-col gap-2 mt-6">
														<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
															Expiry date
														</Label>
														<Popover>
															<PopoverTrigger asChild>
																<Button
																	variant={"outline"}
																	className={cn(
																		"w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] justify-start text-left font-normal",
																		!date1 && "text-muted-foreground"
																	)}
																>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{date1 ? (
																		format(date1, "PPP")
																	) : (
																		<span>Pick a date</span>
																	)}
																</Button>
															</PopoverTrigger>
															<PopoverContent
																className="w-auto p-0"
																align="start"
															>
																<Calendar
																	mode="single"
																	selected={date1}
																	onSelect={handleDate1}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
													</div>
													<div className="flex justify-end">
														<Button
															onClick={() => setSteps(3)}
															className="w-[94px] text-white mt-6"
														>
															Next
															<ArrowRightIcon className="w-5 h-5 ml-2" />
														</Button>
													</div>
												</div>
											</div>
										</div>
									)}{" "}
									{steps === 3 && (
										<div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-6 ">
													<ChevronLeftIcon
														className="cursor-pointer"
														onClick={() => setSteps(2)}
													/>

													<h1 className="text-lg text-[#262626] font-WorkSans font-medium leading-5">
														Upgrade your wallet
													</h1>
												</div>
												<div>
													<NextImage
														src={CloseIcon}
														className="cursor-pointer"
														onClick={closeModal}
														alt="Close Icon"
													/>
												</div>
											</div>
											<div>
												<div className="flex items-center gap-[2.3rem] md:gap-[4.2rem] mt-6 ">
													<div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] ">
														<h1 className="text-primary text-sm font-WorkSans font-normal leading-4 ">
															Step 4 of 4
														</h1>
													</div>
													<div className="">
														<h1 className="text-base text-[#1B1A1A] text-center font-WorkSans font-medium leading-5">
															Address
														</h1>
													</div>
												</div>
											</div>
											<div>
												<div>
													<div className="flex flex-col gap-6 mt-6">
														<div className="flex flex-col gap-2 ">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																House number
															</Label>
															<Input
																type="text"
																name="houseNumber"
																placeholder=""
																onChange={handleChange}
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
														<div className="flex flex-col gap-2">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																Street name
															</Label>
															<Input
																type="text"
																name="streetName"
																placeholder=""
																onChange={handleChange}
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
														<div className="flex flex-col gap-2">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																City
															</Label>
															<Input
																type="text"
																name="city"
																placeholder=""
																onChange={handleChange}
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
														<div className="flex flex-col gap-2">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																Local government
															</Label>
															<Input
																type="text"
																name="localGovernment"
																onChange={handleChange}
																placeholder=""
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
														<div className="flex flex-col gap-2">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																State
															</Label>
															<Input
																type="text"
																name="state"
																onChange={handleChange}
																placeholder=""
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
														<div className="flex flex-col gap-2">
															<Label className="text-[#262626] text-sm font-WorkSans font-normal leading-4">
																Land Mark
															</Label>
															<Input
																type="text"
																name="nearestLandmark"
																onChange={handleChange}
																placeholder=""
																className="w-full h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem] px-4 "
															/>
														</div>
													</div>

													<div className="flex justify-end">
														<Button
															onClick={() => {
																upgradeWallet();
																// nextFunc();
															}}
															className="w-full text-white mt-6"
														>
															{isLoading ? (
																<Loader isWhite={true} />
															) : (
																"Verify and upgrade wallet"
															)}
														</Button>
													</div>
												</div>
												{/* <AddressModal
										nextFunc={() => {
											closeModal();
											closeAddressModal();
											closeDocumentModal();
											closeIdModal();
										}}
									/> */}
											</div>
										</div>
									)}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default Balance;
