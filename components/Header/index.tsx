import React from "react";

type Props = {
  mainText: string;
};

const Header = ({ mainText }: Props) => {
  return (
    <div className="my-6 ">
      <h1 className={`text-3xl`}>{mainText}</h1>
    </div>
  );
};

export default Header;
