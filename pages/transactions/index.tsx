import React, { useEffect, useState } from "react";
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
// import TransactionSect from "../../components/transactions/TransactionSect";
import useAuth from "../../useAuth";
import TransactionsContent from "../../components/transactions/TransactionsContent";
import { useSetting } from "../../modules/services/useSetting";
import { useQuery } from "@tanstack/react-query";
import VerifyEmailModal from "../../components/settings/VerifyEmailModal";

const Transactions = () => {
  useAuth();
  const { getSettings } = useSetting();

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
  // Create a client

  return (
    <div>
       <VerifyEmailModal
        isVisible={showModal}
        onClose={async () => setShowModal(false)}
        email={data?.merchant?.email}
      />
      {/* <TransactionSect/> */}
      {/* <Refunds/> */}
      {/* <ChargeBacks/> */}
      <TransactionsContent />
    </div>
  );
};

export default Transactions;
