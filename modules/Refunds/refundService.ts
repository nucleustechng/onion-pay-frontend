import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const requestRefund = async (payload: { t_id: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/request-refund`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};
