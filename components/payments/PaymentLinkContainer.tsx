import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  link: string;
};

const PaymentLinkContainer = ({ link }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="flex items-center h-[2rem] gap-2 bg-white border-primary border-2 rounded p-2">
      <Link href={link} className="text-gray-500 hover:underline">
        {link}
      </Link>
      <button
        className="text-gray-500 hover:text-gray-600"
        onClick={copyToClipboard}
      >
        <FontAwesomeIcon icon={faCopy}  />
      </button>
      {copied && <span className="text-[#15ed32]">Copied!</span>}
    </div>
  );
};

export default PaymentLinkContainer;
