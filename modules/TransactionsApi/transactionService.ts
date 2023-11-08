import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const token = Cookies.get("token");

export const getTransactions = async () => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/transaction-records`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
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

export const downnloadTransactions = async (payload: {
	start: number;
	end: number;
}) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/download-records`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	if (data?.success == false) {
		toast.error(data?.reason);
	} else {
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `FileName.xlsx`);

		// Append to html link element page
		document.body.appendChild(link);

		// Start download
		link.click();

		// Clean up and remove the link
		link?.parentNode?.removeChild(link);
	}

	return data;
};

export const filterTransactions = async (payload: {
	start: number;
	end: number;
}) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/filter-transactions`,
		payload,
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
