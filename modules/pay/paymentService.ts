import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";

// const token = Cookies.get("token");

export const loadFeePayment = async (payload: {
  o_type: string;
  id: string;
  amount: number;
}) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/load-fee-payment`,
    payload,
  );
  return data;
};

export const loadPaymentLink = async (link: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/client/v1/page/${link}`,
  );
  return data?.page;
};

export const loadOrder = async (orderId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/client/v1/order/${orderId}`,
  );

  return data?.order;
};

export const verifyPayment = async (orderId: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/verify-payment/${orderId}`,
  );

  return data;
};

export const loadSingleInvoice = async (i_id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/client/v1/invoice/${i_id}`,
  );

  return data?.invoice;
};
