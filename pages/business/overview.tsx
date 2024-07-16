import React from "react";
import MyOverview from "../../components/subaccounts/Overview";
import useAuth from "../../useAuth";

const Overview = () => {
  useAuth();

  return (
    <div>
      <div>
        <div className="w-[30rem] xl:w-[74rem]">
          <MyOverview />
        </div>
      </div>
    </div>
  );
};

export default Overview;
