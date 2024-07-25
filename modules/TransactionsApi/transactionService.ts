import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const token = Cookies.get("token");

export const getMobileOperators = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/get-mobile-operators`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data?.data;
};

export const buyAirtime = async (payload: {
  phone_number: string;
  amount: number;
  mobile_operator_id: string;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/buy-airtime`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getTransactions = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/credit-records`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data?.records;
};

export const getDebitTrans = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/debit-records`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data?.records;
};

export const getLoadMoreTransactions = async (payload: { last: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/more-transaction-records`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getLoadMoreDebitTrans = async (payload: { last: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/more-debit-records`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getFilterMoreTransactions = async (payload: {
  start: number;
  end: number;
  last: string;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/filter-more-transactions`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const downnloadTransactions = async (payload: {
  start: number;
  end: number;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/download-records`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure to define 'token' variable
        },
        responseType: "blob", // Set response type to blob to handle binary data
      },
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
      console.error("Invalid response format:", response);
      toast.error("Error downloading transactions. Please try again later.");
    }
    return response?.data;
  } catch (error) {
    console.error("Error downloading transactions:", error);
    toast.error("Error downloading transactions. Please try again later.");
  }
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
    },
  );
  return data;
};

export const searchDebitTransactions = async (payload: { terms: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/search-debit-records`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const searchCreditTransactions = async (payload: { terms: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/search-credit-records`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
