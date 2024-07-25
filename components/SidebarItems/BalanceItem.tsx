// import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BalanceIcon from "../../Assets/icon/Balances.svg";

const BalanceItem = () => {
  const router = useRouter();
  // const [balances,setBalances] = useState<boolean>(false)
  // const dropBalance = () => {

  //     balances ? setBalances(false) : setBalances(true);
  //   };

  const balanceRoute = router.pathname === "/balances";
  // const balancehistoryRoute = router.pathname === '/balances/balancehistory';
  // const settlementsRoute = router.pathname === '/balances/settlements';

  const isActiveRoute = balanceRoute;

  // const isBalanceRoute = balancehistoryRoute || settlementsRoute;

  // useEffect(() => {
  //     if (!isActiveRoute) {
  //         setBalances(false)
  //     }
  // },[isActiveRoute])
  return (
    <div>
      {/* <div className='flex justify-center w-12 lg:hidden'>
            <div className='flex items-center lg:w-[1.1rem] lg:h-[1.5rem]'>
                <Image src={BalanceIcon}  alt='Home Icon' className='w-[1.1rem] h-[1.5rem]'/>
            </div>
        </div> */}
      <div className="mb-5">
        <Link href="/balances">
          <div className="flex lg:justify-center h-6 w-60">
            <div
              className={`w-[0.26rem] h-11 rounded-tr-lg rounded-br-lg ${
                isActiveRoute ? "bg-primary" : "bg-transparent"
              }`}
            />
            <div
              className={`flex items-center gap-[0.67em] w-[13.5rem] h-[2.75rem] 
                            mx-4 px-2
                            ${
                              isActiveRoute
                                ? "bg-[#E7EDFF] rounded-[0.32rem]"
                                : ""
                            }
                            `}
            >
              <div className="flex items-center w-[1.2rem] h-[1.5rem]">
                <Image
                  src={BalanceIcon}
                  alt="Swap Icon"
                  className="lg:w-[1.2rem] lg:h-[1.5rem]"
                />
              </div>
              <div className="flex items-center justify-between w-[9rem]">
                <h1 className="text-[#262626] text-base font-WorkSans">
                  Balances
                </h1>
                {/* <FontAwesomeIcon icon={faChevronDown} className={`w-5 h-5 ${balances ?'rotate-180 ease-in-out duration-500 cursor-pointer' : 'rotate-0 duration-500 ease-in-out cursor-pointer'}`} onClick={()=>{
                                        dropBalance()
                                    }}/> */}
              </div>
            </div>
          </div>
          {/* <ul className={`${balances ? 'flex flex-col h-16 translate-x-0 ease-in-out duration-500' : 'overflow-hidden p-0 h-0 ease-in-out -translate-x-28 duration-500'}
                                    gap-[0.63rem]
                                    mb-0
                                    ${balances ? 'mt-[1.8rem]' : 'mt-[1.2rem]'}
                                    mx-6`}>
                                    <Link href='/balances'><li className={`text-sm 
                                   ${balanceRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Balance</li></Link>
                                    <Link href='/balances/balancehistory'><li className={`text-sm 
                                   ${balancehistoryRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Balance history</li></Link>
                                    <Link href='/balances/settlements'><li className={`text-sm 
                                   ${settlementsRoute ? 'text-primary' : 'text-[#262626]'} font-WorkSans font-normal leading-4`}>Settlements</li></Link>
                            </ul> */}
        </Link>
      </div>
    </div>
  );
};

export default BalanceItem;
