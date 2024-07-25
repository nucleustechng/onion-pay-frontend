import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getPaymentPages = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/payment-pages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data?.pages;
};
