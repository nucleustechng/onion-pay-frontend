import axios from "axios";
import Cookies from "js-cookie";
import { ICertificateUpload, IOrganisationInfo } from "../../types";

export function useCorporate() {
  const addOrganisationInfo = async (payload: IOrganisationInfo) => {
    try {
      let token = Cookies.get("token");

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/corporate-accounts/organisation-info`,
        payload,

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

  const uploadCertificates = async (payload: ICertificateUpload) => {
    try {
      let token = Cookies.get("token");

      const { cacCertificate,proofOfAddressVerification,utilityBill,regulatoryLicenseFintech,scumlCertificate } = payload;

  const formDataObject = new FormData();
      formDataObject.append("cacCertificate", cacCertificate)
      formDataObject.append("proofOfAddressVerification", proofOfAddressVerification)
      formDataObject.append("utilityBill", utilityBill)
      if (scumlCertificate) {
        formDataObject.append("scumlCertificate", scumlCertificate)
      }

      if (regulatoryLicenseFintech) {
        formDataObject.append("regulatoryLicenseFintech", regulatoryLicenseFintech)
      }
      

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/corporate-accounts/upload-certificates`,
        formDataObject,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
    addOrganisationInfo,
    uploadCertificates
  };
}
