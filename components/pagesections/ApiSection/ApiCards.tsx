import React from "react";

interface Props {
  width: string;
  height: string;
  backgroundColor: string;
  mainText: string;
}

const ApiCards = ({ width, height, backgroundColor, mainText }: Props) => {
  return (
    <div>
      <div
        className={`flex justify-center items-center ${width} ${height} ${backgroundColor} rounded-[0.313rem]`}
      >
        <h1 className="text-white text-xl font-WorkSans font-medium leading-[3.375rem]">
          {mainText}
        </h1>
      </div>
    </div>
  );
};

export default ApiCards;
