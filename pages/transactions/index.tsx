import React, { useEffect, useState } from "react";
import useAuth from "../../useAuth";
import TransactionsContent from "../../components/transactions/TransactionsContent";
import { useSetting } from "../../modules/services/useSetting";
import { useQuery } from "@tanstack/react-query";
import VerifyEmailModal from "../../components/settings/VerifyEmailModal";

const Transactions = () => {
  useAuth();
  const { getSettings } = useSetting();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  const verified = data?.merchant?.verified;

  useEffect(() => {
    if (data && verified === false) {
      setShowModal(true);
    }
  }, [data, verified]);

  return (
    <div>
      {data && (
        <VerifyEmailModal
          isVisible={showModal}
          onClose={async () => setShowModal(false)}
          email={data.merchant?.email}
        />
      )}
      <TransactionsContent />
    </div>
  );
};

export default Transactions;
