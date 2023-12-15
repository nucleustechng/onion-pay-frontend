import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";

const token = Cookies.get("token");

export const loadFeePayment = async (payload: {
	o_type: string;
	id: string;
	amount: number;
}) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/load-fee-payment`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return data;
};
