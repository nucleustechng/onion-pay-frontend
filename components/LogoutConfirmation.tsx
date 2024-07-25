import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "./Loader";
import LogOutIcon from "../Assets/icon/LogOut.svg";

interface Props {
  isVisible: boolean;
  onClose: () => {};
}

const LogoutConfirmation = ({ isVisible, onClose }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    // Perform logout logic here
    // Example: Make API request to logout endpoint or clear session

    // Simulate a delay before redirecting to the home page
    setTimeout(() => {
      Cookies.remove("token");
      router.push("/auth/signin");
      setIsLoading(false);
    }, 1000);

    // Redirect to home page after logout
    // router.push('/');
  };

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-[#262626] z-30 bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col gap-6 w-[20rem] h-[13.325rem] py-6 md:mb-[30rem] lg:mb-0 rounded-[0.63rem] bg-white">
        <div className="">
          <div className="flex justify-center">
            <h2 className="text-xl w-[10.637rem]   text-[#1B1A1A] font-WorkSans mb-4 font-semibold text-center leading-5">
              Are you sure you want to Log Out?
            </h2>
          </div>
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center bg-[#DE0040] rounded-[0.625rem] w-11 h-11 lg:w-11 lg:h-11">
              <Image
                src={LogOutIcon}
                alt="Settings"
                className="w-[1.6rem] h-[1.6rem]"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#F5F5F5] hover:bg-gray-400 text-[#1B1A1A] font-WorkSans text-sm font-normal py-2 px-4 rounded mr-2"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className={`bg-primary hover:bg-primary-dark text-white font-WorkSans text-sm font-normal py-2 px-4 rounded ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? <Loader isWhite={true} /> : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
