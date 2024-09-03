import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import { useRouter } from "next/router";
import ButtonRegular from "../Buttons/ButtonRegular";
import OtpInput from "../OtpInput";
import { useBusiness } from "../../modules/services/useBusiness";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  email: string;
}

const VerifyEmailModal = ({ isVisible, onClose, email }: Props) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const { verifyEmail, resendVerifyCode } = useBusiness();
  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("Data", data);
      if (data.success) {
        toast.success("Email has been verified");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 4000);
      } else {
        toast.error(data?.reason);
      }
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  const { mutate: resendCodeMutate } = useMutation({
    mutationFn: resendVerifyCode,
    onSuccess: ({ success, reason }) => {
      if (success) {
        startCountdown();
        toast.success("New code has been sent!");
      } else {
        toast.error(reason);
      }
    },
    onError: (error) => {
      console.error("Error", error);
    },
  });

  const handleOtpComplete = (otp: string) => {
    setOtp(otp);
    // handleSubmit();
  };

  const sendCode = async () => {
    if (email) {
      resendCodeMutate(email);
    } else {
      toast.error("Email not found");
    }
  };

  const [remainingTime, setRemainingTime] = useState("01:00");

  useEffect(() => {
    startCountdown();
  }, []);

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
      mutate(code);
    } else {
      toast.error("Please enter a valid code");
    }
  };

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
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] z-40 flex justify-center items-center overflow-y-scroll"
        id="wrapper"
        onClick={handleClose}
      >
        {/* h-[57.2rem] */}
        <div className="w-fit bg-white h-auto rounded-md">
          <div
            className="cursor-pointer flex justify-end m-2"
            onClick={() => {
              onClose();
            }}
          >
            <XIcon />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="">
                <div className="w-[21.875rem] md:w-[45rem] md:h-[5.625rem] flex justify-center  items-center h-[6.75rem]">
                  <h1 className="text-[#303778] text-5xl md:text-[3.625rem] text-center leading-[3.375rem] font-SpaceGrotesk font-bold">
                    Verify your email
                  </h1>
                </div>
                <div className="w-[21.875rem] md:w-[45rem]  flex justify-center mt-10  mb-10">
                  <p className="text-center text-[#202020] text-base leading-5 font-normal font-Montserrat">
                    Input the verification code sent to{" "}
                    <span className="font-WorkSans text-primary">
                      {email ? email : "..."}
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
                    mainText={
                      isPending ? <Loader isWhite={true} /> : "Verify OTP"
                    }
                    textSize="text-base"
                    width="w-[21.875rem] md:w-[30rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
