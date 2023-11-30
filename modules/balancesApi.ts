import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";

const token = Cookies.get("token");

export const getBalances = async () => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/balances`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return data?.balances;
};
