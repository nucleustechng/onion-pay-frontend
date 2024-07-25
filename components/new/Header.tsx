import React from "react";
import NavigationSheet from "./sheet/NavigationSheet";

type Props = {
  mainText: string;
};

export default function Header({ mainText }: Props) {
  return (
    <div>
      <div className=" w-full flex items-center justify-between py-6">
        <h1 className={`text-3xl`}>{mainText}</h1>

        <NavigationSheet />
      </div>
    </div>
  );
}
