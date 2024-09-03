import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/new/Sidebar";
import { ToastContainer } from "react-toastify";
// import Footer from "../components/Footer/Footer";
// import Navbar from "../components/Navbar/Navbar";
// import SideBar from "../components/SideBar";
// import SideBarMobile from "../components/SidebarMobile";
import "react-toastify/dist/ReactToastify.css";
import { useSetting } from "../modules/services/useSetting";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VerifyEmailModal from "../components/settings/VerifyEmailModal";

const Layout = ({ children }: any) => {
  const { getSettings } = useSetting();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(true);

  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
  const verified = data?.merchant?.verified;

  useEffect(() => {
    if (verified === false) {
      setShowModal(true);
    }
  }, []);

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
      <VerifyEmailModal
        isVisible={showModal}
        onClose={async () => setShowModal(false)}
        email={data?.merchant?.email}
      />
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
