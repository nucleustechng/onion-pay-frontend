import Image from "next/image";
import SidebarComponent from "./SidebarComponent";
import Logo from "../../Assets/logo/OnionPayLogo.svg";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="hidden md:flex flex-col w-[280px] h-screen  pt-0  border border-r-[1px] overflow-y-auto">
      <div className="flex items-center px-5">
        <Image src={Logo} width={123} height={30} alt="Onion Pay Logo" />
      </div>
      <SidebarComponent />
    </div>
  );
}
