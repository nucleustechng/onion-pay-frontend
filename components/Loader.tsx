import Image from "next/image";
import React from "react";
import LoadSpinner from "../Assets/LoadSpinner.svg";
import LoaderImage from "../Assets/Loader.svg";

interface Props {
  width?: string;
  height?: string;
  isWhite?: boolean;
}

const Loader = ({ width, height, isWhite }: Props) => (
  <div className="animate-spin">
    <Image
      src={isWhite ? LoaderImage : LoadSpinner}
      loading="eager"
      className={`${width} ${height} `}
      alt="Loader"
    />
  </div>
);

export default Loader;
