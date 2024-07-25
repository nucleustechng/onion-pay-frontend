import axios from "axios";
import Cookies from "js-cookie";
import { IUpgradeWalletFormData } from "../../types";
import { toast } from "react-toastify";

export function useBusiness() {
  const getBusinessInfo = async () => {
    try {
      let token = Cookies.get("token");

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data?.business;
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

  const upgradeWallet = async ({
    address,
    documentDetails,
    idDetails,
  }: IUpgradeWalletFormData) => {
    try {
      const token = Cookies.get("token");
      console.log("documentDetails", documentDetails);
      console.log("idDetails", idDetails);
      console.log("address", address);

      const formDataObject = new FormData();

      if (documentDetails.selfie) {
        formDataObject.append("selfie", documentDetails.selfie);
      }
      if (documentDetails.signature) {
        formDataObject.append("signature", documentDetails.signature);
      }
      if (documentDetails.utilityBill) {
        formDataObject.append("utilityBill", documentDetails.utilityBill);
      }
      if (documentDetails.document) {
        formDataObject.append("document", documentDetails.document);
      }
      if (idDetails.idType) {
        formDataObject.append("idType", idDetails.idType);
      }
      if (idDetails.idIssueDate) {
        formDataObject.append("idIssueDate", idDetails.idIssueDate);
      }
      if (idDetails.idExpiryDate) {
        formDataObject.append("idExpiryDate", idDetails.idExpiryDate);
      }
      if (idDetails.idNumber) {
        formDataObject.append("idNumber", idDetails.idNumber);
      }
      if (address) {
        formDataObject.append("houseNumber", address?.houseNumber.toString());
      }
      if (address) {
        formDataObject.append("streetName", address?.streetName);
      }
      if (address) {
        formDataObject.append("city", address?.city);
      }
      if (address) {
        formDataObject.append("localGovernment", address?.localGovernment);
      }
      if (address) {
        formDataObject.append("state", address?.state);
      }
      if (address) {
        formDataObject.append("nearestLandmark", address?.nearestLandmark);
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/upgrade-wallet`,
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    } catch (error) {
      console.error("Error occurred during upgrade request:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return {
    getBusinessInfo,
    upgradeWallet,
  };
}
