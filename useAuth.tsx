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
	const protectedRoutes = [
		"/transactions",
		"/transfers",
		"/settings",
		"/payments",
		"/business",
		"/balances",
	];

	// Check if the current route is a protected route
	const isProtectedRoute = protectedRoutes.includes(router.pathname);

	useEffect(() => {
		const verify = Cookies.get("token");

		if (!verify && isProtectedRoute) {
			router.push("/auth/signin");
		}
		if (userInfo?.verified === false) {
			router.push("/auth/verifyemail");
		}
	}, []);
};

export default useAuth;
