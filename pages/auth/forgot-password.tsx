import ButtonIcon from "../../components/Buttons/ButtonIcon";
import ButtonRegular from "../../components/Buttons/ButtonRegular";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input";
import CommerceItem from "../../components/Navbar/NavbarItems/CommerceItem";
import ContactItem from "../../components/Navbar/NavbarItems/ContactItem";
import DevelopersItem from "../../components/Navbar/NavbarItems/DeveloperItem";
import PaymentItem from "../../components/Navbar/NavbarItems/PaymentItem";
import CloseIcon from "../../Assets/icons/CloseIcon.svg";
import Logo from "../../Assets/logo/OnionPayLogo.svg";
import Hamburger from "../../Assets/icons/Hamburger.svg";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	useForgotPasswordMutation,
	useResetPasswordMutation,
} from "../../modules/auth/api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useAppDispatch } from "../../redux/redux-hooks/hooks";
import { setMyEmail } from "../../redux/passwordResetSlice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface IResetInfo {
	email: string;
	code: string;
	n_pass: string;
}

const Forgotpassword = () => {
	const [toggleNav, setToggleNav] = useState<boolean>(false);
	const [resetpassword, setResetPassword] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	// const newEmail = useAppSelector((state: RootState) => state.email.email);

	const [email, setEmail] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [resetInfo, setResetInfo] = useState<IResetInfo>({
		email: "",
		code: "",
		n_pass: "",
	});

	const [
		forgotPassword,
		{
			data: forgotPassData,
			isLoading: forgotPassLoading,
			isSuccess: forgotPassSuccess,
		},
	] = useForgotPasswordMutation();
	const [resetPassword, { data, isLoading, isSuccess }] =
		useResetPasswordMutation();

	const handleForgotPass = async () => {
		if (email) {
			Cookies.set("email", email);
			await forgotPassword({ email });
		} else {
			toast.error(forgotPassData?.reason, { autoClose: 1500 });
		}
	};

	const handleResetPass = async () => {
		if (resetInfo?.email && resetInfo?.code && resetInfo?.n_pass) {
			const retrievedEmail = Cookies.get("email");
			const source = { email: retrievedEmail };
			const payload = Object.assign(resetInfo, source);

			await resetPassword(payload);
		} else {
			toast.error(forgotPassData?.reason, { autoClose: 1500 });
		}
	};

	useEffect(() => {
		if (forgotPassSuccess && forgotPassData?.success) {
			const retrievedEmail = Cookies.get("email");

			toast.success(`An otp was sent to ${retrievedEmail}`, {
				autoClose: 4000,
			});
			Cookies.set("resetPassBoolean", "true");
			router.push("/auth/reset-password");
			setResetPassword(true);
			dispatch(setMyEmail(email));
		} else {
			toast.error(forgotPassData?.reason, { autoClose: 1500 });
		}
	}, [forgotPassSuccess, forgotPassData, resetInfo, dispatch, email]);

	useEffect(() => {
		if (isSuccess && data?.success) {
			toast.success("You have successfuly changed your password!!", {
				autoClose: 1000,
			});

			router.push("/auth/signin");

			setResetInfo({
				email: "",
				code: "",
				n_pass: "",
			});
			// dispatch(setMyEmail(''))
		} else {
			toast.error(data?.reason, { autoClose: 1500 });
		}
	}, [data, isSuccess, router]);

	return (
		<div className="bg-[#F5F5F5]">
			<ToastContainer />
			<div>
				<div>
					<div className="">
						<div
							className={`px-5 overflow-y-scroll w-screen   bg-[#F5F5F5] fixed inset-0 h-full z-50 transition-all duration-500
              ${
								toggleNav
									? "right-20"
									: "left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[65rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]"
							}`}
						>
							<div
								className="flex justify-end mt-[1.875rem] cursor-pointer"
								onClick={() => setToggleNav(!toggleNav)}
							>
								<Image
									src={CloseIcon}
									alt="Close Icon"
								/>
							</div>
							{/* CTA buttons */}
							<div className="flex flex-col gap-6 mt-[1.875rem]">
								<Link
									href="/auth/signin"
									className="flex justify-center"
								>
									<ButtonRegular
										width="w-40"
										height="h-11"
										textSize="text-base"
										backgroundColor="bg-white"
										borderColor="border-primary"
										borderWidth="border-[0.0625rem]"
										color="text-primaryText"
										mainText="Sign in"
									/>
								</Link>
								<Link
									href="/auth/signup"
									className="flex justify-center"
								>
									<ButtonRegular
										width="w-40"
										height="h-11"
										textSize="text-base"
										backgroundColor="bg-primary"
										color="text-white"
										mainText="Get started"
									/>
								</Link>
							</div>
							<hr className="w-auto h-0 mt-6 border-[0.0625rem] border-[#CACACA]" />
							<div className="flex flex-col mt-5 pb-11">
								<PaymentItem />
								<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
								<CommerceItem />
								<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
								<ContactItem />
								<hr className="w-auto h-0 mt-6 mb-5 border-[0.0625rem] border-[#CACACA]" />
								<DevelopersItem />
							</div>
						</div>
					</div>
					{/* Closed state */}
					<div className="fixed left-0 right-0 top-0  z-30">
						<div
							className="flex justify-between px-5  items-center h-[4.375rem] pt-[1.875rem] pb-[0.625rem] 
                  bg-[#F5F5F5]
                  lg:px-28 xl:px-[9.375rem] xl:h-[5.75rem] 
                  "
						>
							<Link
								href="/"
								className="cursor-pointer"
							>
								<Image
									src={Logo}
									alt="Logo"
									className="w-[12rem]"
								/>
							</Link>

							<div className="hidden lg:flex justify-between items-center w-[16rem]">
								<Link href="/auth/signin">
									<ButtonRegular
										width=" w-[5.875rem]"
										height="h-11"
										textSize="text-base"
										backgroundColor="bg-white cursor-pointer"
										borderColor="border-primary"
										borderWidth="border-[0.0625rem]"
										color="text-primaryText"
										mainText="Sign in"
									/>
								</Link>
								<Link href="/auth/signup">
									<ButtonIcon
										width="w-[9.5rem]"
										height="h-11"
										backgroundColor="bg-primary cursor-pointer"
										color="text-white"
										mainText="Get started"
									/>
								</Link>
							</div>
							<div
								className="flex items-center cursor-pointer lg:hidden"
								onClick={() => setToggleNav(!toggleNav)}
							>
								<Image
									src={Hamburger}
									alt="Hamburger Icon"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{!resetpassword ? (
				<div className="flex  justify-center mb-[2rem] lg:mb-[5rem] ">
					<div className="flex flex-col pt-32 lg:pb-20">
						<div className="flex flex-col gap-10">
							<h1
								className="w-[21.875rem] sm:w-[25rem] xl:w-[70rem]  text-center text-[#303778] text-5xl font-SpaceGrotesk font-bold leading-[3.375rem]
                    lg:w-[60rem] lg:text-[5.625rem] lg:leading-[5.625rem]
                    "
							>
								Forgot Password<span className="text-[#FF9635]">!</span>
							</h1>
						</div>
						<div className="flex justify-center">
							<div className="lg:bg-white  lg:w-[33rem] h-[18.575rem] mt-[3.75rem] rounded-[0.625rem]">
								<h2 className="mt-6 text-lg text-center text-[#1B1A1A] font-WorkSans font-normal leading-5">
									Provide the email for your account
								</h2>
								<div className="flex justify-center mt-10 ">
									<div className="flex flex-col gap-6">
										<Input
											width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
											height="h-[3.125rem]"
											name="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											label="Email"
											textSize="text-sm"
											placeholder="example@email.com"
											type="email"
										/>
										<div></div>
										<div
											className="mt-4"
											onClick={handleForgotPass}
										>
											<ButtonRegular
												width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
												height="h-11"
												backgroundColor="bg-primary"
												borderWidth="0.313rem"
												color="text-white"
												mainText={
													forgotPassLoading ? (
														<Loader isWhite={true} />
													) : (
														"Continue"
													)
												}
												textSize="text-base"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex  justify-center mb-[5rem] lg:mb-[16rem] ">
					<div className="flex flex-col pt-32 lg:pb-20">
						<div className="flex flex-col gap-10">
							<h1
								className="w-[21.875rem] sm:w-[25rem] xl:w-[70rem]  text-center text-[#303778] text-5xl font-SpaceGrotesk font-bold leading-[3.375rem]
                    lg:w-[60rem] lg:text-[5.625rem] lg:leading-[5.625rem]
                    "
							>
								Change Password<span className="text-[#FF9635]">!</span>
							</h1>
						</div>
						<div className="flex justify-center">
							<div className="lg:bg-white  md:w-[33rem] h-[34.575rem] mt-[3.75rem] rounded-[0.625rem]">
								<h2 className="mt-6 text-lg text-center text-[#1B1A1A] font-WorkSans font-normal leading-5">
									Fill in your information to change password
								</h2>
								<div className="flex justify-center mt-10 ">
									<div className="flex flex-col gap-6">
										{/* <Input width='w-[21.875rem] lg:w-[25rem] xl:w-[30rem]' 
                                    height='h-[3.125rem]' 
                                    name='email'
                                    value={resetInfo.email}
                                    onChange={(e) => setResetInfo({...resetInfo, email: e.target.value})}
                                    label='Email' 
                                    textSize='text-sm' 
                                    placeholder='example@email.com'
                                    type='email'
                                    /> */}
										<Input
											name="code"
											value={resetInfo.code}
											onChange={(e) =>
												setResetInfo({ ...resetInfo, code: e.target.value })
											}
											width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
											height="h-[3.125rem]"
											label="OTP Code"
											textSize="text-sm"
											placeholder="********"
											type="text"
										/>
										<div>
											<Input
												width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
												height="h-[3.125rem]"
												name="confirmpass"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												label="New password"
												textSize="text-sm"
												placeholder="Password"
												type="password"
											/>
										</div>
										<div>
											<Input
												width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
												height="h-[3.125rem]"
												name="n_pass"
												value={resetInfo.n_pass}
												onChange={(e) =>
													setResetInfo({ ...resetInfo, n_pass: e.target.value })
												}
												label="Confirm password"
												textSize="text-sm"
												placeholder="Password"
												type="password"
											/>
										</div>
										<div
											className="mt-4"
											onClick={handleResetPass}
										>
											<ButtonRegular
												width="w-[21.875rem] lg:w-[25rem] xl:w-[30rem]"
												height="h-11"
												backgroundColor="bg-primary"
												borderWidth="0.313rem"
												color="text-white"
												mainText={
													isLoading ? <Loader isWhite={true} /> : "Continue"
												}
												textSize="text-base"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="relative z-20">
				<Footer />
			</div>
		</div>
	);
};

export default Forgotpassword;
