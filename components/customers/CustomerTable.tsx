import React from "react";

interface IProps {
  // firstName:string,
  // lastName:string,
  // email:string,
  // customerId:number,
  // date:string
  isBlackList?: boolean;
}

const CustomerTable = ({ isBlackList }: IProps) => {
  return (
    <div>
      <div className="flex items-center px-4 w-[71.5rem] h-[3.8rem]">
        <div className="flex items-center gap-3 w-[20rem]">
          <div
            className={`flex items-center justify-center ${isBlackList ? "bg-[#898989]" : "bg-primary"} w-10 h-10 rounded-full`}
          >
            <h1 className="text-base text-[#ffff] font-Montserrat font-medium leading-5">
              BB
            </h1>
          </div>
          <h1 className="text-base text-[#262626] font-WorkSans font-normal leading-5">
            Bamaiyi Bitrus
          </h1>
        </div>
        <div className="w-[17.7rem]">
          <h1 className="text-base text-[#262626] font-WorkSans font-normal leading-5">
            bamaiyi@gmail.com
          </h1>
        </div>
        <div className="w-[17.7rem]">
          <h1 className="text-base text-[#262626] font-WorkSans font-semibold leading-5">
            ID: 1234567854
          </h1>
        </div>
        <div className="w-[16.3rem]">
          <h1>Nov 19, 2022 - 10:28 AM</h1>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
