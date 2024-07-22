// import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FolderIcon from "../../Assets/icon/Folder.svg";

const CorporateItem = () => {
  const router = useRouter();
  // const transfersRoute = router.pathname == '/payments/transfers'
  const corporateaccountRoute = "/corporate-account";
  const isActiveRoute = corporateaccountRoute === router.pathname;
  return (
    <div>
      {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={FolderIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
      <div>
        <Link href={corporateaccountRoute}>
          <div className={`flex justify-center lg:w-60`}>
            <div
              className={`w-[0.26rem] h-11  rounded-tr-lg rounded-br-lg ${isActiveRoute ? "bg-primary" : "bg-transparent"}`}
            />
            <div
              className={`flex items-center gap-[0.67em] w-[13.5rem] h-[2.75rem] 
                            mx-4 px-2
                            ${isActiveRoute ? "bg-[#E7EDFF] rounded-[0.32rem]" : ""}
                            `}
            >
              <div className="flex items-center w-[1.2rem] h-[1.5rem]">
                <Image
                  src={FolderIcon}
                  alt="Swap Icon"
                  className="lg:w-[1.2rem] lg:h-[1.5rem]"
                />
              </div>
              <div className="flex items-center justify-between w-fit">
                <h1 className="text-[#262626] text-base font-WorkSans">
                  Corporate account
                </h1>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CorporateItem;
