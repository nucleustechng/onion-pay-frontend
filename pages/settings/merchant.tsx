import React from "react";
import MerchantSettings from "../../components/settings/MerchantSettings";
import useAuth from "../../useAuth";

const MerchantSetting = () => {
  useAuth();

  return (
    <div>
      <MerchantSettings />
    </div>
  );
};

export default MerchantSetting;
