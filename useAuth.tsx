import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./modules/user/userService";

const useAuth = () => {
	const router = useRouter();
	const { data: userInfo } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	useEffect(() => {
		const verify = Cookies.get("token");

		if (!verify) {
			router.push("/auth/signin");
		}
		if (userInfo?.verified === false) {
			router.push("/auth/verifyemail");
		}
	}, []);
};

export default useAuth;
