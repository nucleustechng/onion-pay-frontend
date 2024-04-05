import Logo from "../Assets/logo/OnionPayLogo.svg";
import LogOutIcon from "../Assets/icon/LogOut.svg";
import Image from "next/image";
// import HomeItem from './SidebarItems/HomeItem'
import TransactionItem from "./SidebarItems/TransactionItem";
// import BalanceItem from './SidebarItems/BalanceItem'
import PaymentItem from "./SidebarItems/PaymentItem";
import BusinessItem from "./SidebarItems/BusinessItem";
// import Link from 'next/link'
// import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useToggleModeMutation } from "../modules/Environment/switchEnvironment";
import CustomToggle from "./CustomToggle";
import SettingsItem from "./SidebarItems/SettingsItem";
import LogoutConfirmation from "./LogoutConfirmation";
import TransfersItem from "./SidebarItems/TransfersItem";
import { useLoadSettingsQuery } from "../modules/LoadSettings/settingsApi";
import BalanceItem from "./SidebarItems/BalanceItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoadDevSettingsQuery } from "../modules/ApiKeys/generateApiKeys";
import {
	ArrowRightIcon,
	ArrowUpIcon,
	CalendarIcon,
	ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { Transition, Dialog } from "@headlessui/react";

import { Button } from "../@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../@/components/ui/label";
import { Input } from "../@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../@/components/ui/popover";
import { cn } from "../@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../@/components/ui/calendar";
import Loader from "./Loader";
import Cookies from "js-cookie";
import axios from "axios";
import CloseIcon from "../Assets/icon/CloseIcon.svg";
import { useLoadWalletQuery } from "../modules/WalletApi";
// import { Badge } from "../@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../@/components/ui/tooltip";

const SideBar = () => {
	const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
	const [initialMode, setInitialMode] = useState<boolean>(false);

	const logoutUser = () => {
		setShowLogoutModal(true);
	};
	const { data: devSettingsData, isSuccess: devSettingSuccess } =
		useLoadDevSettingsQuery();

	const [isSwitchOn, setIsSwitchOn] = useState<boolean>(initialMode);
	const [
		switchEnvironment,
		{ data: switchEnvData, isSuccess: switchIsSuccess },
	] = useToggleModeMutation();

	const switch_onChange_handle = () => {
		setIsSwitchOn((prevState) => !prevState);
		switchEnvironment(isSwitchOn);
	};

	useEffect(() => {
		if (devSettingSuccess) {
			console.log(devSettingsData["business"]?.live_mode);
			setInitialMode(devSettingsData["business"]?.live_mode);
			setIsSwitchOn(devSettingsData["business"]?.live_mode);
		}
	}, [devSettingSuccess]);

	useEffect(() => {
		if (switchIsSuccess) {
			if (switchEnvData?.success == true) {
				toast.success(
					`You have successfully switched to ${
						switchEnvData?.live == true ? "live mode" : "test mode"
					}`
				);
			} else {
				toast.error(switchEnvData?.reason);
			}
		}
	}, [switchIsSuccess]);

	const [businessData, setBusinessData] = useState<any>();

	// const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()
	const { data: settingsData, isSuccess: settingSuccess } =
		useLoadSettingsQuery();
	const { data: walletData } = useLoadWalletQuery();

	const walletTier = walletData ? walletData["wallet"]?.tier : "--";
	useEffect(() => {
		// businessUpdated ? setRefetch(true) :   setRefetch(false)
		if (settingSuccess && settingsData.success == true) {
			setBusinessData(settingsData["business"]);
		} else {
			console.log("An error occured");
		}
	}, [settingSuccess, settingsData]);

	/// New

	// One
	// const webcamRef = useRef<Webcam>(null);
	// const [capturedImage, setCapturedImage] = useState<any>();
	// const [imageToDisplay, setImageToDisplay] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [steps, setSteps] = useState<number>(0);

	const hiddenSelfieInput: any = useRef(null);
	const handleSelfieClick = () => {
		hiddenSelfieInput.current?.click();
	};
	const [selfie, setSelfie] = useState<any>();

	const selfieChange = (e: any) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];

			setSelfie(selectedFile);

			// setSelectedImage(selectedFile);
			// setBusinessInfo(prevState => ({
			//     ...prevState,
			//     file: selectedFile
			// }));
		}
	};

	// function dataURLtoFile(dataURL: any, filename: any) {
	// 	const arr = dataURL.split(",");
	// 	const mime = arr[0].match(/:(.*?);/)[1];
	// 	const bstr = atob(arr[1]);
	// 	let n = bstr.length;
	// 	const u8arr = new Uint8Array(n);

	// 	while (n--) {
	// 		u8arr[n] = bstr.charCodeAt(n);
	// 	}

	// 	return new File([u8arr], filename, { type: mime });
	// }

	// const captureImage = useCallback(() => {
	// 	const imageSrc = webcamRef.current?.getScreenshot();
	// 	setImageToDisplay(imageSrc);
	// 	if (imageSrc) {
	// 		const file = dataURLtoFile(imageSrc, "captured_image.jpg");
	// 		setCapturedImage(file);
	// 	}
	// }, []);

	// Two

	const [fileAdded2, setFileAdded2] = useState<boolean>(false);
	const [fileAdded3, setFileAdded3] = useState<boolean>(false);

	const [utilityBill, setUtilityBill] = useState(null);
	const [signature, setSignature] = useState(null);

	const hiddenFileInput2: any = useRef(null);
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

	const hiddenFileInput3: any = useRef(null);
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

	const hiddenFileInput1: any = useRef(null);
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

	// const FundBalanceModal = dynamic(() => import("./modals/FundBalanceModal"));
	const upgradeWallet = async () => {
		setIsLoading(true);
		try {
			const token = Cookies.get("token");
			const formDataObject = new FormData();

			if (selfie) {
				formDataObject.append("selfie", selfie);
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
				setSelfie("");
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

	useEffect(() => {
		console.log(businessData?.hasWallet);
	}, [businessData]);

	return (
		<div>
			<ToastContainer />
			{/*  */}
			<div className="hidden md:flex lg:flex  h-screen lg:h-screen pb-[20px] ">
				<div className="flex flex-col w-60 h-screen overflow-y-auto scrollbar-hide">
					<div className="flex items-center pl-5 mt-6 mb-16 lg:pl-5 lg:mb-16 lg:mt-6 w-[14rem] h-6">
						<div>
							<Image
								src={Logo}
								className="w-[12rem]"
								alt="Onion Pay Logo"
							/>
						</div>
					</div>
					<div className="h-[24rem]">
						<div className="flex items-center justify-between mb-4 px-4">
							{/* <h1>CEO</h1> */}
							{/* <Badge
								variant="outline"
								color="#3063E9"
								className="font-WorkSans font-bold border-solid px-3 py-1 text-sm"
							>
								Tier {walletTier} Wallet
							</Badge> */}
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											color="#3063E9"
											className="font-WorkSans font-bold border-solid px-3 py-1 text-sm"
										>
											Tier {walletTier} Wallet
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											{walletTier === 1
												? "Single Inflow Limit: N50,000 Cumulative Balance Limit: N300,000"
												: "Single Inflow Limit: N5,000,000 Unlimited Cumulative Balance"}
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<h1 className="flex pl-7 mb-4 lg:flex text-[#898989] lg:pl-5 lg:mb-4 lg:text-sm">
							Menu
						</h1>

						<div className="flex flex-col gap-2 lg:gap-1">
							{/* <div>
                        <HomeItem/>  
                    </div> */}
							<div>
								<TransactionItem />
							</div>
							<div>
								<TransfersItem />
							</div>
							<div>
								<BalanceItem />
							</div>
							<div>
								<PaymentItem />
							</div>
							{businessData?.hasWallet === false && (
								<div>
									<BusinessItem />
								</div>
							)}
						</div>
					</div>
					<div
						className={`flex flex-col lg:flex-col gap-[1.63rem] lg:h-32  mt-8 }`}
					>
						<div className="flex justify-between items-center mx-6">
							<h1 className="text-base text-[#1B1A1A] font-WorkSans font-normal leading-5">
								{isSwitchOn ? "Live Mode" : "Test Mode"}
							</h1>
							<CustomToggle
								value={isSwitchOn}
								onChange={switch_onChange_handle}
							/>
						</div>
						<hr className="border-solid border-[0.068rem] border-[#F5F0F3]" />

						<div
							onClick={openModal}
							className="flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer"
						>
							<div className="flex items-center justify-center  rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]">
								<ArrowUpIcon className="text-primary w-5 h-5" />
							</div>
							<h1 className="text-primary text-base leading-[1.19rem] font-WorkSans font-normal">
								Upgrade wallet
							</h1>
						</div>
						<hr className="border-solid border-[0.068rem] border-[#F5F0F3]" />
						<div className="flex lg:flex  mt-0">
							<SettingsItem />
							{/* <Link href='/settings'>
                                <div className='flex justify-center w-60'
                                >
                                <div className={`w-[0.26rem] h-11 rounded-tr-lg rounded-br-lg ${router.pathname == '/settings' ? 'bg-primary' : 'bg-transparent'}`}/>
                                    <div className={`flex items-center gap-[0.6rem] w-[13.5rem] h-[2.75rem] mx-4 px-2
                                    ${router.pathname == '/settings' ? 'bg-[#E7EDFF] rounded-[0.32rem]' : ''}
                                    `}>
                                        <div className='flex items-center justify-center bg-[#EEB625] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]'>
                                            <Image src={SettingIcon}  alt='Customers Icon' className='lg:w-[1.2rem] lg:h-[1.5rem]'/>
                                        </div>
                                        <h1 className='text-[#262626] text-base font-WorkSans'>Settings</h1>
                                    </div>
                                </div>
                            </Link> */}
						</div>
						<div
							className="flex items-center gap-5 pl-7 lg:gap-2 lg:pl-7 cursor-pointer"
							onClick={logoutUser}
						>
							<div className="flex items-center justify-center bg-[#F31212] rounded-full w-[1.5rem] h-[1.5rem] lg:w-[1.6rem] lg:h-[1.6rem]">
								<Image
									src={LogOutIcon}
									alt="Settings"
									className="lg:w-[1.6rem] lg:h-[1.6rem]"
								/>
							</div>
							<h1 className="text-[#262626] text-base leading-[1.19rem] font-WorkSans font-normal">
								Log out
							</h1>
						</div>
						{/* <hr className='lg:mt-[0.2rem] border-solid border-[0.068rem] border-[#F5F0F3]' />
                <div className='flex items-center pl-7 gap-2 lg:gap-2 h-6   lg:pl-7'>
                    <div className='flex justify-center items-center w-[2rem] h-[2rem]  lg:w-10 lg:h-10 bg-[#61A72C] rounded-full'>
                        <h1 className='font-Montserrat font-medium text-base text-white leading-5 '>JD</h1>
                    </div>
                    <div className='flex items-center gap-[3.7rem]'>
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-base text-black font-WorkSans font-normal leading-[1.2rem]'>John Doe</h1>
                            <h2 className='text-xs text-[#898989] font-WorkSans font-normal  leading-3'>ID: 1002345678</h2>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisVertical} className='text-base'/>
                    </div>
                </div> */}
					</div>
				</div>
				{/* Vertical line */}
				<div className="border-[#CACACA] border-solid border-[0.065rem] h-screen " />
			</div>
			<LogoutConfirmation
				isVisible={showLogoutModal}
				onClose={async () => setShowLogoutModal(false)}
			/>
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
													<Image
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
															Upload a selfie
														</h1>
													</div>
												</div>
											</div>
											<div className="">
												<div>
													<div className="flex justify-center mt-6">
														<div className="flex justify-center w-full ">
															<div className="flex flex-col">
																{/* <h1 className="text-white text-center text-sm font-WorkSans font-normal leading-4 mt-4">
																	Fit your face in the space bellow
																</h1> */}
																<div className="relative w-[14.9rem] h-[22rem] border-[#FF9635] border-[0.0625rem] rounded-full overflow-hidden mt-4">
																	{selfie && (
																		<Image
																			src={URL.createObjectURL(selfie)}
																			width={238.4}
																			height={352}
																			className="object-cover w-full h-full flex items-center justify-center"
																			alt="Captured"
																		/>
																	)}
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
														{!selfie ? (
															<Button
																onClick={handleSelfieClick}
																className="w-full text-white"
															>
																Upload
																<input
																	type="file"
																	name="file"
																	className="hidden"
																	onChange={selfieChange}
																	ref={hiddenSelfieInput}
																/>
															</Button>
														) : (
															<div className="flex flex-col w-full gap-4">
																<Button
																	onClick={handleSelfieClick}
																	className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 "
																>
																	Upload
																	<input
																		type="file"
																		name="file"
																		className="hidden"
																		onChange={selfieChange}
																		ref={hiddenSelfieInput}
																	/>
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
													<Image
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
													<Image
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
													<Image
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

export default SideBar;
