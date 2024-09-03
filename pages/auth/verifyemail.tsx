import ButtonIcon from "../../components/Buttons/ButtonIcon";
import ButtonRegular from "../../components/Buttons/ButtonRegular";
import CommerceItem from "../../components/Navbar/NavbarItems/CommerceItem";
import ContactItem from "../../components/Navbar/NavbarItems/ContactItem";
import DevelopersItem from "../../components/Navbar/NavbarItems/DeveloperItem";
import PaymentItem from "../../components/Navbar/NavbarItems/PaymentItem";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../Assets/icons/CloseIcon.svg";
import Logo from "../../Assets/logo/OnionPayLogo.svg";
import Hamburger from "../../Assets/icons/Hamburger.svg";
import Footer from "../../components/Footer/Footer";
import OtpInput from "../../components/OtpInput";
import {
  useLoadEmailQuery,
  useRequestVerifyCodeMutation,
  useVerifyemailMutation,
} from "../../modules/auth/api/AuthApi";
import Loader from "../../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Verifyemail = () => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const [useremail, setUserEmail] = useState<string>("");
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");

  const handleOtpComplete = (otp: string) => {
    setOtp(otp);
    handleSubmit();
  };

  const { data: loadEmailData, isSuccess: loadEmailSuccess } =
    useLoadEmailQuery();
  const [verifyEmail, { data: verifyEmailData, isSuccess, isLoading }] =
    useVerifyemailMutation();
  const [
    requestVerifyCode,
    { data: requestCodeData, isSuccess: requestCodeSuccess },
  ] = useRequestVerifyCodeMutation();

  const sendCode = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      await requestVerifyCode({ email });
    } else {
      console.log(requestCodeData);
    }
  };

  const [remainingTime, setRemainingTime] = useState("01:00");

  const startCountdown = () => {
    let [minutes, seconds] = remainingTime
      .split(":")
      .map((str) => parseInt(str));

    let countdownInterval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        clearInterval(countdownInterval);
        setRemainingTime("01:00");
        console.log("Remaining time", remainingTime);
        return;
      }

      let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
      setRemainingTime(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);
  };

  const handleSubmit = async () => {
    const code = otp;
    if (code) {
      await verifyEmail({ code });
    } else {
      console.log(verifyEmailData?.reason || "Missing required fields");
    }
  };

  useEffect(() => {
  const email = localStorage.getItem("email") as string;

    setUserEmail(email)
  },[])

  useEffect(() => {
    try {
      if (isSuccess && verifyEmailData?.success == true) {
        toast.success("Email has been verified");
        setTimeout(() => {
          router.push("/business");
        }, 4000);
      } else {
        toast.error(verifyEmailData?.reason);
      }
    } catch (err) {
      console.log(err);
      console.log(verifyEmailData?.reason);
    }
  }, [isSuccess, verifyEmailData, router]);

  useEffect(() => {
    if (requestCodeSuccess) {
      toast.success("The code has been sent to your email");
    }
  }, [requestCodeSuccess, requestCodeData]);

  useEffect(() => {
    if (loadEmailSuccess) {
      setUserEmail(loadEmailData?.email);
    }
  }, [loadEmailSuccess]);


  return (
    <div>
      <ToastContainer />
      <div>
        <div className="">
          <div
            className={`px-5 overflow-y-scroll w-screen   bg-[#F5F5F5] fixed inset-0 h-full z-50 transition-all duration-500
              ${toggleNav ? "right-20" : "left-[30.65rem] min-[492px]:left-[45rem] sm:left-[50rem] md:left-[65rem] lg:left-[85rem] xl:left-[95rem] min-[280px]:left-[25rem] min-[412px]:left-[30rem]"}`}
          >
            <div
              className="flex justify-end mt-[1.875rem] cursor-pointer"
              onClick={() => setToggleNav(!toggleNav)}
            >
              <Image src={CloseIcon} alt="Close Icon" />
            </div>
            {/* CTA buttons */}
            <div className="flex flex-col gap-6 mt-[1.875rem]">
              <Link href="/auth/signin" className="flex justify-center">
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
              <Link href="/auth/signup" className="flex justify-center">
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
            <Link href="/" className="cursor-pointer">
              <Image src={Logo} className="w-[12rem]" alt="Logo" />
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
              <Image src={Hamburger} alt="Hamburger Icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-28">
          <div className="w-[21.875rem] md:w-[45rem] md:h-[5.625rem] flex justify-center  items-center h-[6.75rem]">
            <h1 className="text-[#303778] text-5xl md:text-[3.625rem] text-center leading-[3.375rem] font-SpaceGrotesk font-bold">
              Verify your email
            </h1>
          </div>
          <div className="w-[21.875rem] md:w-[45rem]  flex justify-center mt-10  mb-10">
            <p className="text-center text-[#202020] text-base leading-5 font-normal font-Montserrat">
              Input the verification code sent to{" "}
              <span className="font-WorkSans text-primary">
                {useremail ? useremail : "..."}
              </span>
            </p>
          </div>
          <div className="w-[21.875rem] md:w-[45rem] flex  flex-wrap justify-center items-center gap-[0.625rem] mb-10">
            <OtpInput fields={8} onComplete={handleOtpComplete} />
          </div>
          <div className="w-[21.875rem] md:w-[45rem] flex justify-center  mb-6">
            <div className="w-[21.875rem] md:w-[30rem] flex justify-between items-center">
              <p className="text-base text-primary  font-WorkSans font-normal leading-5  text-left">
                {remainingTime}
              </p>
              {remainingTime == "01:00" ? (
                <button
                  onClick={() => {
                    sendCode();
                    startCountdown();
                  }}
                  className="text-base text-primary bg-transparent font-WorkSans font-normal leading-5  text-right"
                >
                  Resend code
                </button>
              ) : (
                <button
                  disabled
                  onClick={sendCode}
                  className="text-base text-primary bg-transparent font-WorkSans font-normal leading-5  text-right"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
          <div
            className="flex justify-center  mb-16 w-[21.875rem] md:w-[45rem]"
            onClick={() => handleSubmit()}
          >
            <ButtonRegular
              backgroundColor="bg-primary"
              color="text-white"
              height="h-11"
              mainText={isLoading ? <Loader isWhite={true} /> : "Verify OTP"}
              textSize="text-base"
              width="w-[21.875rem] md:w-[30rem]"
            />
          </div>
        </div>
      </div>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Verifyemail;
