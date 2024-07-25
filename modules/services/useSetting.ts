import axios from "axios";
import Cookies from "js-cookie";

export function useSetting() {
  const getSettings = async () => {
    try {
      let token = Cookies.get("token");

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          // Accessing the error message from the response data
          // const errorMessage = axiosError?.response?.data?.message;
          if (axiosError?.response?.status === 401) {
            // refreshTokenHelper();
          }
          // toast(errorMessage, {
          // 	// description: "Sunday, December 03, 2023 at 9:00 AM",
          // 	action: {
          // 		label: "Undo",
          // 		onClick: () => console.log("Undo"),
          // 	},
          // });

          return axiosError?.response?.data;
        }
      }
      // Handle other errors
      console.error("Error:", error.message);
      throw error;
    }
  };

  return {
    getSettings,
  };
}
