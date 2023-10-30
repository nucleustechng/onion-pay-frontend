import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";


const useAuth = () => {
	const router = useRouter();
	

	useEffect(() => {
		const verify = Cookies.get("token");

		if (!verify) {
			router.push("/auth/signin");
		}
	}, []);
};

export default useAuth;
