import React from "react";

interface Props {
  mainText: string;
  subText: string;
}

const OverviewTable = ({ mainText, subText }: Props) => {
  const textStyle =
    "text-base  text-[#1B1A1A] font-WorkSans font-normal leading-5";
  return (
    <div>
      <div className="flex items-center justify-between h-[3.75rem]">
        <h1 className={textStyle}>{mainText}</h1>
        <h2 className={textStyle}>{subText}</h2>
      </div>
    </div>
  );
};

export default OverviewTable;
