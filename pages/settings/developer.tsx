import React from "react";
import useAuth from "../../useAuth";
import ApiKeysModal from "../../components/settings/ApiKeysModal";

const Developer = () => {
	useAuth();
	return (
		<div>
			<ApiKeysModal />
		</div>
	);
};

export default Developer;
