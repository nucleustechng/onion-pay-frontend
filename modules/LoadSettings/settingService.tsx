import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";

const token = Cookies.get("token");

export const updateFee = async (payload: { client_pays_fee: boolean }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/update-fee-payment`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
