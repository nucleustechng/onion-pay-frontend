import { useRouter } from "next/router";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/new/Sidebar";
import { ToastContainer } from "react-toastify";
// import Footer from "../components/Footer/Footer";
// import Navbar from "../components/Navbar/Navbar";
// import SideBar from "../components/SideBar";
// import SideBarMobile from "../components/SidebarMobile";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: any) => {
  const router = useRouter();

  if (router.pathname.includes("/auth/signup")) return children;
  if (router.pathname.includes("/auth/signin")) return children;
  if (router.pathname.includes("/auth/verifyemail")) return children;

  const showmerchantLayout =
    router.pathname.includes("/balances") ||
    router.pathname.includes("/business") ||
    router.pathname.includes("/payments") ||
    router.pathname.includes("/transactions") ||
    router.pathname.includes("/customers") ||
    router.pathname.includes("/settings") ||
    router.pathname.includes("/dashboard") ||
    router.pathname.includes("/transfers") ||
    router.pathname.includes("/corporate");

  return (
    <div className="w-screen">
      <ToastContainer />
      {!showmerchantLayout && (
        <div>
          <Navbar />
          <div>{children}</div>
          <div className="relative z-20">
            <Footer />
          </div>
        </div>
      )}
      {showmerchantLayout && (
        <div className="flex">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-full pl-2 md:ml-6">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
