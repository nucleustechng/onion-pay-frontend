import React from "react";
import NavCard from "../NavCard";
import DevelopersIcon from "../../../Assets/icons/developers/DevelopersIcon.svg";

const DevelopersItem = () => {
	return (
		<div>
			<div>
				<div className="flex flex-col gap-[1.625rem]">
					<NavCard
						header="Developers"
						mainText="Read the API docs"
						icon={DevelopersIcon}
						alt="Inquiries Icon"
						backgroundColor="bg-[#FFF3C8]"
						link="https://documenter.getpostman.com/view/3501578/2s9YC7TBk1"
					/>
				</div>
			</div>
		</div>
	);
};

export default DevelopersItem;
