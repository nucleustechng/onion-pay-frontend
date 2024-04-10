import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditIcon from "../../Assets/icon/EditIcon.svg";
// import CopyIcon from '../Assets/icon/CopyIcon.svg'
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
import { RootState } from "../../redux/store";
import { setShowSidebar } from "../../redux/sidebarSlice";
import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
// import { useGenerateKeysQuery } from '../modules/ApiKeys/generateApiKeys'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	useLoadSettingsQuery,
	useUpdateBusinessLogoMutation,
} from "../../modules/LoadSettings/settingsApi";
import UpdateDetailsModal from "../../components/settings/UpdateDetailsModal";
import useAuth from "../../useAuth";
import Link from "next/link";

const Settings = () => {
	useAuth();

	const [showModal, setShowModal] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const sidebarShow = useAppSelector(
		(state: RootState) => state.sidebar.sidebarShow
	);
	const businessUpdated = useAppSelector(
		(state: RootState) => state.business.businessUpdated
	);
	// const [refetch,setRefetch] = useState<boolean>();

	// const  [apiKey,setApiKey]  = useState<string>('')
	const [businessData, setBusinessData] = useState<any>();

	// const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()
	const {
		data: settingsData,
		isSuccess: settingSuccess,
		refetch,
	} = useLoadSettingsQuery();

	const [hasBusiness, setHasBusiness] = useState<boolean>(false);

	useEffect(() => {
		// businessUpdated ? setRefetch(true) :   setRefetch(false)
		if (settingSuccess && settingsData.success == true) {
			setBusinessData(
				settingsData["business"]
					? settingsData["business"]
					: settingsData["merchant"]
			);
			settingsData["business"] ? setHasBusiness(true) : setHasBusiness(false);
		} else {
			toast.error(settingsData?.reason);
		}
	}, [settingSuccess, businessUpdated, settingsData]);

	// useEffect(() => {
	//     if (isSuccess && generateKeyData.success == true){
	//         setApiKey(generateKeyData?.live_pub_key)
	//     } else{
	//         console.log(generateKeyData?.reason)
	//     }
	// },[isSuccess,generateKeyData])

	// const [showPop, setShowPop] = useState(false);

	// const copyToClipboard = (copyItem:any) => {
	//     navigator.clipboard.writeText(copyItem);
	//     toast.success('Copied!!',{autoClose:2000})
	// };

	const hiddenFileInput: any = React.useRef(null);
	const handleClick = () => {
		hiddenFileInput.current?.click();
	};

	const [updateLogo, { isSuccess: updateLogoSuccess, data: updateData }] =
		useUpdateBusinessLogoMutation();
	const [updatedImage, setUpdatedImage] = useState<boolean>(false);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];

			const logo = selectedFile;
			if (logo) {
				const formData = new FormData();
				formData.append("logo", logo);

				try {
					await updateLogo(formData);
				} catch (error) {
					console.error("Error updating logo:", error);
				}
			}
		}
	};

	useEffect(() => {
		if (updateLogoSuccess && updateData?.success) {
			setUpdatedImage(true);
		} else {
			setUpdatedImage(false);
			toast.error(updateData?.reason);
		}
	}, [updateLogoSuccess, updatedImage]);
	useEffect(() => {
		if (businessUpdated || updatedImage) {
			refetch();
		}
	}, [businessUpdated, refetch, updatedImage]);
	console.log("businessdata", businessData);

	return (
		<div className="">
			<ToastContainer />

			<div className="w-auto md:w-[32rem] xl:w-[71.5rem]">
				<div className="mx-6 my-6">
					<div className="flex justify-between items-center mr-9 mb-12">
						<h1 className="text-[2rem] text-[#262626]  font-WorkSans font-medium leading-[2.4rem]">
							Settings
						</h1>
						{!sidebarShow && (
							<div
								className="md:hidden"
								onClick={() => dispatch(setShowSidebar(true))}
							>
								<Image
									src={Hamburger}
									alt="Hamburger Icon"
								/>
							</div>
						)}
					</div>
					<div className="w-auto flex justify-between items-center pt-12">
						<div className="flex items-center gap-4">
							<div className="w-[4rem] h-[4rem]  lg:w-[4rem] lg:h-[4rem] object-fill rounded-full">
								<Image
									src={businessData?.logo_uri}
									width={100}
									height={100}
									className="w-[4rem] h-[4rem]  lg:w-[4rem] lg:h-[4rem] object-fill"
									alt=""
								/>
							</div>
							<div className="flex flex-col gap-1 md:gap-[0.375rem]">
								<h1 className="text-sm md:text-base text-[#1B1A1A] font-WorkSans font-medium leading-5">
									{businessData?.name}
								</h1>
								{/* <h2 className='text-xs md:text-sm text-[#898989] font-WorkSans font-normal leading-4 '>ID: OP49867466389</h2> */}
							</div>
						</div>
						<div>
							<div>
								<div
									onClick={handleClick}
									className="flex justify-center items-center cursor-pointer w-[6rem] md:w-[7.5625rem] h-11 gap-[0.625rem] rounded-[0.3125rem] bg-primary"
								>
									<h1 className="text-xs md:text-sm text-white font-WorkSans font-normal leading-4">
										Edit logo
									</h1>
									<Image
										src={EditIcon}
										alt="Edit Icon"
									/>
								</div>
								<input
									type="file"
									name="logo"
									onChange={handleFileChange}
									className="hidden"
									ref={hiddenFileInput}
								/>
							</div>
						</div>
					</div>
					<div className="flex justify-end">
						<div
							onClick={() => {
								setShowModal(true);
							}}
							className="flex justify-center items-center cursor-pointer w-[10rem] md:w-[12.5625rem] h-11 gap-[0.625rem] rounded-[0.3125rem] bg-[#61A72C]"
						>
							<h1 className="text-xs md:text-sm text-white font-WorkSans font-normal leading-4">
								Edit business details
							</h1>
							<Image
								src={EditIcon}
								alt="Edit Icon"
							/>
						</div>
					</div>
					<hr className="w-[25rem] sm:w-[37rem] md:w-[32rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6" />

					<div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								{hasBusiness ? "Business" : "Merchant"} name
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{hasBusiness
									? businessData?.name
										? businessData?.name
										: "--"
									: businessData?.f_name
									? businessData?.f_name + businessData?.l_name
									: "--"}
							</h2>
						</div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								{" "}
								{hasBusiness ? "Business" : "Merchant"} email
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData?.email ? businessData?.email : "--"}
							</h2>
						</div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								{" "}
								{hasBusiness ? "Business" : "Merchant"} phone
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData?.phone ? businessData?.phone : "--"}
							</h2>
						</div>
						{/* <div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								{" "}
								{hasBusiness ? "Business" : "Merchant"} address
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData
									? businessData["address"]?.state +
									  " " +
									  businessData["address"]?.city +
									  " " +
									  businessData["address"]?.streetName
									: "--"}
							</h2>
						</div> */}
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								Business website
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData?.website ? businessData?.website : "--"}
							</h2>
						</div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								Wallet name
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData?.walletName ? businessData?.walletName : "--"}
							</h2>
						</div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								Wallet number
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4">
								{businessData?.walletNumber ? businessData?.walletNumber : "--"}
							</h2>
						</div>
						<div className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center">
							<h1 className="text-sm text-[#898989] font-WorkSans font-normal leading-4">
								Wallet Tier {businessData?.tier ? businessData?.tier : "--"}
							</h1>
							<h2 className="text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4"></h2>
						</div>
						<hr className="w-auto sm:w-[37rem] md:w-[29rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6" />

						<Link href="/settings/developer">
							<div className="w-[10rem] h-11 border-[0.0625rem] border-primary rounded-[0.313rem] cursor-pointer">
								<div className=" flex justify-center items-center h-11 text-sm text-primary font-WorkSans font-normal leading-4">
									<h1>Developer settings</h1>
								</div>
							</div>
						</Link>
					</div>

					{/* <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] flex justify-between items-center mb-6'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>NIN:</h1>
                    <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{businessData?.nin ? businessData?.nin : '--'}</h2>
                </div> */}

					{/* <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Sign-up Date:</h1>
                    <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Nov 19, 2019 - 10:28 AM</h2>
                </div> */}
					{/* <hr className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] border-primary border-[0.0625rem] my-6' /> */}
					{/* <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>API Keys:</h1>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{apiKey}</h2>
                        <div className='cursor-pointer' onClick={() => copyToClipboard(apiKey)}>
                            <Image src={CopyIcon} alt=''/>
                        </div>
                    </div>
                </div> */}
					{/* <div className='w-[25rem] sm:w-[37rem] md:w-[47rem] lg:w-[50rem] xl:w-[70rem] mb-6 flex justify-between items-center'>
                    <h1 className='text-sm text-[#898989] font-WorkSans font-normal leading-4'>Web hooks:</h1>
                    <div className='flex items-center gap-3'>
                        <div className='w-[16rem] sm:w-auto cursor-pointer flex justify-center text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{webHook}</div>
                        <Image src={CopyIcon} alt='' className='cursor-pointer' onClick={() => copyToClipboard(webHook)}/>
                    </div>
                </div> */}
				</div>
			</div>
			<div>
				<UpdateDetailsModal
					isVisible={showModal}
					onClose={async () => setShowModal(false)}
					r_name={businessData?.name}
					r_email={businessData?.email}
					r_phone={businessData?.phone}
					r_address={businessData?.address}
					r_website={businessData?.website}
					r_bvn={businessData?.bvn}
				/>
			</div>
			{/* <div>
				<ApiKeysModal
					isVisible={showApiKeyModal}
					onClose={async () => setShowApisKeyModal(false)}
					businessName={businessData?.name}
				/>
			</div> */}
		</div>
	);
};

export default Settings;
