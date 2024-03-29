import React from "react";

const TransactionHeader = () => {
	return (
		<div>
			<div className="flex items-center rounded-[0.32rem] w-[71.5rem] px-4 h-12 bg-[#F5F5F5]">
				<div className="w-[22.5rem]">
					<h1>Sender</h1>
				</div>
				<div className="w-[26rem] ">
					<h1>Recipient</h1>
				</div>
				<div className="w-[26rem] ">
					<h1>Reference ID</h1>
				</div>
				<div className="w-[18.4rem]">
					<h1>Amount</h1>
				</div>
				<div className="w-[12rem]">
					<h1>Date</h1>
				</div>
				{/* <div className='w-[21.65rem]'>
              <h1>Status</h1>
            </div> */}
			</div>
		</div>
	);
};

export default TransactionHeader;
