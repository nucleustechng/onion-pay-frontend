import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLoadSettingsQuery } from "./modules/LoadSettings/settingsApi";

const useAuth = () => {
	const router = useRouter();
	const [businessData, setBusinessData] = useState<any>();
	const businssRoute = router.pathname == "/business";

	// const {data:generateKeyData,isSuccess} = useGenerateKeysQuery()
	const { data: settingsData, isSuccess: settingSuccess } =
		useLoadSettingsQuery();

	useEffect(() => {
		// businessUpdated ? setRefetch(true) :   setRefetch(false)
		if (settingSuccess && settingsData.success == true) {
			setBusinessData(settingsData["business"]);
		} else {
			console.log("An error occured");
		}
	}, [settingSuccess, settingsData]);

	useEffect(() => {
		const verify = Cookies.get("token");

		if (!verify) {
			router.push("/auth/signin");
		}
		if (businessData && businssRoute) {
			router.push("/transactions/");
		}
	}, []);
};

export default useAuth;
