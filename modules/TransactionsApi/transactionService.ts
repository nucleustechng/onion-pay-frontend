import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getTransactions = async () => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_URL}api/v1/transaction-records`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	console.log("data", data);
	return data?.records;
};

export const getLoadMoreTransactions = async (payload: { r_id: string }) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_URL}api/v1/more-transaction-record/${payload}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return data;
};

// export const loadTransactionByBusiness = async (payload: { b_id: string }) => {
// 	const { data } = await axios.post(
// 		`${process.env.NEXT_PUBLIC_URL}admin/records-by-business`,
// 		payload,
// 		{
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 		}
// 	);
// 	return data?.records;
// };
