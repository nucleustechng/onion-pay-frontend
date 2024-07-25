import React, { useState } from "react";
// import PaymentLinks from "../../components/payments/PaymentLinks";
import useAuth from "../../useAuth";
import { PaymentLinkTable } from "../../components/Tables/PaymentLinkTable";
import { getPaymentPages } from "../../modules/PaymentPageApi/paymenyPageService";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../@/components/ui/button";
// import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks/hooks";
// import { RootState } from "../../redux/store";
// import { setShowSidebar } from "../../redux/sidebarSlice";
// import Image from "next/image";
// import Hamburger from "../../Assets/icon/HamburgerIcon.svg";
import SingleChargeModal from "../../components/payments/modals/SingleChargeModal";
import Header from "../../components/new/Header";

const Paymentlinks = () => {
  useAuth();
  const { data: paymentLinks, isLoading } = useQuery({
    queryKey: ["paymentLinks"],
    queryFn: getPaymentPages,
  });

  // const dispatch = useAppDispatch();
  // const sidebarShow = useAppSelector(
  //   (state: RootState) => state.sidebar.sidebarShow,
  // );
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto px-2 lg:px-6">
      <Header mainText="Payment links" />

      <Button
        onClick={() => {
          setShowModal(true);
        }}
        className="w-fit mr-2 md:mr-0 ml-2 md:ml-0"
      >
        <h1 className="text-base font-WorkSans font-normal text-white">
          New payment link
        </h1>
        <FontAwesomeIcon
          icon={faPlus}
          className="w-5 h-5 ml-4 text-base text-white"
        />
      </Button>

      <div className="flex-1 pr-0 md:pr-6">
        <PaymentLinkTable isLoading={isLoading} paymentLinks={paymentLinks} />
      </div>
      <div>
        <SingleChargeModal
          isVisible={showModal}
          onClose={async () => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default Paymentlinks;
