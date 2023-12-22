import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
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

export const getLoadmoreBalances = async (payload: { last: string }) => {
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_URL}/api/v1/more-balances`,
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	console.log("balances: ", data);
	return data;
};

export const downnloadBalances = async (payload: {
	start: number;
	end: number;
}) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_URL}/api/v1/download-balances`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`, // Make sure to define 'token' variable
				},
				responseType: "blob", // Set response type to blob to handle binary data
			}
		);

		if (response && response.headers && response.headers["content-type"]) {
			const blob = new Blob([response.data], {
				type: response.headers["content-type"],
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "data.xlsx"; // Specify the file name for download
			a.click();
			window.URL.revokeObjectURL(url); // Clean up the URL object to free resources
		} else {
			// console.error("Invalid response format:", response);
			toast.error("Error downloading balance history. Please try again later.");
		}
		return response?.data;
	} catch (error) {
		// console.error("Error downloading balance history:", error);
		toast.error("Error downloading balance history. Please try again later.");
	}
};
