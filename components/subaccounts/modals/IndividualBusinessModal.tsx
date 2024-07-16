import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import CloseIcon from "../../../Assets/icon/CloseIcon.svg";
import { useAuthorizeBusinessMutation } from "../../../modules/BusinessPageApi/businessApi";
import CustomToggle from "../../CustomToggle";
import Input from "../../Input";
import Loader from "../../Loader";

interface Props {
  isVisible: boolean;
  onClose: () => {};
  handlerFunc: (nextstep: string) => void;
}

interface IBusinessForm {
  bvn: string;
  pep: boolean;
}

const IndividualBusinessModal = ({
  isVisible,
  onClose,
  handlerFunc,
}: Props) => {
  const [togglePep, setTogglePep] = useState<boolean>(false);

  const handleToggle = () => {
    setTogglePep(!togglePep);
  };
  // const  [selectedID,setSelectedID] = useState<string>('')
  // const [dropDown,setDropDown] = useState<boolean>(false)
  // const [dropDownInfo,setDropDownInfo] = useState<string>('')

  // const hiddenFileInput:any = React.useRef(null);
  // const handleClick = () => {
  //         hiddenFileInput.current?.click();
  //   };

  //   const [selectedImage, setSelectedImage] = useState<any>();

  // This function will be triggered when the file field change
  // const imageChange = (e:any) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //         const selectedFile = e.target.files[0];
  //         setSelectedImage(selectedFile);
  //         setBusinessInfo(prevState => ({
  //             ...prevState,
  //             file: selectedFile
  //         }));
  //     }
  // };

  // This function will be triggered when the "Remove This Image" button is clicked
  // const removeSelectedImage = () => {
  //     setSelectedImage(null);
  // };

  const [businessInfo, setBusinessInfo] = useState<IBusinessForm>({
    bvn: "",
    pep: false,
  });

  const [authoriseBusiness, { isSuccess, isLoading, data: businessData }] =
    useAuthorizeBusinessMutation();

  const handleAuthorizeBusiness = async () => {
    const { bvn, pep } = businessInfo;
    console.log("Business info", businessInfo);

    try {
      if (bvn) {
        await authoriseBusiness({ pep, bvn });
      } else {
        toast.error("All fields are required");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let toastShown = false;
    setBusinessInfo({ ...businessInfo, pep: togglePep });

    if (isSuccess && businessData?.success && !toastShown) {
      toastShown = true; // Set the flag to true to indicate that toast has been shown
      toast.success(businessData?.reason);
      setTimeout(() => {
        handlerFunc("verify");
      }, 1500);
      // console.log('Business data',businessData)
    } else if (!toastShown) {
      toastShown = true; // Set the flag to true to indicate that toast has been shown
      toast.error(businessData?.reason);
    }
  }, [businessData, togglePep]);

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  if (!isVisible) return null;
  return (
    <div>
      <ToastContainer />
      <form
        method="post"
        encType="multipart/form-data"
        action="/upload"
        onSubmit={handleAuthorizeBusiness}
        className="fixed inset-0 bg-[#262626] bg-opacity-50 backdrop-blur-[0.05rem] flex justify-center items-center"
        id="wrapper"
        onClick={handleClose}
      >
        <div className={`w-[33rem]  h-[20rem] rounded-[0.63rem] bg-white`}>
          <div className="flex flex-col mx-6 mt-6">
            <div className="flex items-center justify-between">
              <div
                onClick={() => handlerFunc("create-business")}
                className="flex items-center cursor-pointer gap-[0.85rem]"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
                <h1 className="text-[#1B1A1A] text-lg font-semibold font-WorkSans leading-5">
                  Individual business
                </h1>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <Image src={CloseIcon} alt="Close Icon" />
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-center gap-[3.82rem]">
                <div className="flex items-center justify-center w-[5.32rem] h-5 rounded-[1.25rem] border-primary border-[0.065rem] ">
                  <h1 className="text-primary text-sm font-WorkSans font-normal leading-4 ">
                    Step 2 of 2
                  </h1>
                </div>
                <h1>Select your type of business</h1>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <Input
                  width="w-[20.5rem] md:w-[25rem] lg:w-[30rem]"
                  name="bvn"
                  type="text"
                  value={businessInfo.bvn}
                  label="Bank Verification Number"
                  onChange={(e) =>
                    setBusinessInfo({ ...businessInfo, bvn: e.target.value })
                  }
                  placeholder=""
                  height="h-[3.13rem]"
                  textSize=""
                />
              </div>
              <div className="flex justify-between items-center">
                <h1
                  className={`text-base ${
                    togglePep ? "text-primary" : "text-[#1B1A1A]"
                  } font-WorkSans font-normal leading-5`}
                >
                  Are you a{" "}
                  <span
                    data-tip="Politically Exposed Person (PEP)"
                    data-for="pep-tooltip"
                    className="text-primary underline cursor-pointer"
                  >
                    politically exposed person?
                  </span>
                </h1>
                <CustomToggle value={togglePep} onChange={handleToggle} />

                <Tooltip
                  id="pep-tooltip"
                  // effect="solid"
                >
                  <a
                    href="https://en.wikipedia.org/wiki/Politically_exposed_person"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </Tooltip>
              </div>
              {/*  */}
              {/* <di className='relative flex flex-col gap-2'>
                                <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Select ID</h1>
                                <div onClick={() => setDropDown(!dropDown)} className='flex items-center justify-between px-6 w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                    <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>{dropDownInfo ? dropDownInfo : "Select identification"}</h1>
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                </div>
                                <p className='text-[#202020] text-xs font-WorkSans font-normal leading-3'>Please ensure your ID type matches the ID you intend to upload.</p>
                                {dropDown && <div className='absolute left-[20rem] flex flex-col bg-[#F9F9F9] border-[0.0625rem] border-[#EEEEEE] rounded-[0.3125rem] w-[10.375rem] h-[12.6rem] overflow-y-auto overflow-x-hidden scrollbar-hide'>
                                    <h1 className='text-[#000000] cursor-pointer tex-sm font-WorkSans font-normal pl-6 py-1' onClick={() => {
                                        setBusinessInfo({...businessInfo, doc_type:'dlc'})
                                        setDropDown(false)
                                        setDropDownInfo(`Driver's license`)
                                        }}>{`Driver's license`}</h1>
                                    <hr className='border-[0.0625rem] border-[#EEEEEE] w-[10.375rem] '  />
                                    <h1 className='text-[#000000] cursor-pointer tex-sm font-WorkSans font-normal pl-6 py-1' onClick={() => {
                                        setBusinessInfo({...businessInfo, doc_type:'vtc'})
                                        setDropDown(false)
                                        setDropDownInfo(`Voter's card`)
                                        }}>{`Voter's card`}</h1>
                                    <hr className='border-[0.0625rem] border-[#EEEEEE] w-[10.375rem] ' />
                                    <h1 className='text-[#000000] cursor-pointer tex-sm font-WorkSans font-normal pl-6 py-1' onClick={() => {
                                        setBusinessInfo({...businessInfo, doc_type:'nis'})
                                        setDropDown(false)
                                        setDropDownInfo('National Identity Slip')
                                        }}>National Identity Slip</h1>
                                    <hr className='border-[0.0625rem] border-[#EEEEEE] w-[10.375rem] '/>
                                    <h1 className='text-[#000000] cursor-pointer tex-sm font-WorkSans font-normal pl-6 py-1' onClick={() => {
                                        setBusinessInfo({...businessInfo, doc_type:'nic'})
                                        setDropDown(false)
                                        setDropDownInfo('National Identity Card')
                                        }}>National Identity Card</h1>
                                    <hr className='border-[0.0625rem] border-[#EEEEEE] w-[10.375rem]' />
                                    <h1 className='text-[#000000] cursor-pointer tex-sm font-WorkSans font-normal pl-6 py-1' onClick={() => {
                                        setBusinessInfo({...businessInfo, doc_type:'ipp'})
                                        setDropDown(false)
                                        setDropDownInfo('International Passport')
                                        }}>International Passport</h1>
                                </div>}
                            </di> */}
            </div>
            {/* {selectedImage && <div className='w-[30rem] h-[16.5rem] bg-[#F5F5F5] rounded-[0.313rem] mt-6'>
                            <div className='flex justify-center mt-4'>
                                <h1>Uploaded file preview</h1>
                            </div>
                            {selectedImage && <div className='flex justify-center  mt-4'>
                                <Image src={URL.createObjectURL(selectedImage)} width={444} height={200} className='w-[27.765rem] h-[12.525rem]' alt='ID Card'/>
                            </div>}
                    </div>}
                    <div className='flex flex-col gap-2 mt-6 cursor-pointer' onClick={handleClick}>
                                <h1 className='text-[#262626] text-sm font-WorkSans font-normal leading-4'>Upload ID</h1>
                                <div className='flex items-center justify-between px-6 w-[30rem] h-[3.13rem] border-solid border-[#CACACA] border-[0.063rem] rounded-[0.32rem]'>
                                    <h1 className='text-sm text-[#1B1A1A] font-WorkSans font-normal leading-4'>Select file</h1>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </div>
                            <input type='file' name='file'  className='hidden' onChange={imageChange} ref={hiddenFileInput}/> 
                    </div> */}
            {/* Call to action button */}
            <div className="flex justify-center mt-6">
              <div
                className="w-[12.5rem] h-11 cursor-pointer bg-primary rounded-[0.313rem] flex justify-center items-center "
                onClick={handleAuthorizeBusiness}
              >
                <div className=" text-white text-base font-WorkSans leading-5">
                  {isLoading ? <Loader isWhite={true} /> : "Start verification"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IndividualBusinessModal;
