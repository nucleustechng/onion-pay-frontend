import axios from "axios";
import Cookies from "js-cookie";
import {
  ICertificateUpload,
  IDirectories,
  IOrganisationInfo,
  ISignatories,
} from "../../types";

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

      const {
        cacCertificate,
        proofOfAddressVerification,
        utilityBill,
        regulatoryLicenseFintech,
        scumlCertificate,
      } = payload;

      const formDataObject = new FormData();
      formDataObject.append("cacCertificate", cacCertificate);
      formDataObject.append(
        "proofOfAddressVerification",
        proofOfAddressVerification,
      );
      formDataObject.append("utilityBill", utilityBill);
      if (scumlCertificate) {
        formDataObject.append("scumlCertificate", scumlCertificate);
      }

      if (regulatoryLicenseFintech) {
        formDataObject.append(
          "regulatoryLicenseFintech",
          regulatoryLicenseFintech,
        );
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

  const addSignatories = async (payload: ISignatories) => {
    try {
      let token = Cookies.get("token");

      const {
        address,
        bankVerificationNumber,
        customerPassport,
        dateOfBirth,
        email,
        firstName,
        gender,
        idCardFront,
        lastName,
        nationalIdentityNo,
        nationality,
        nextOfKinName,
        nextOfKinPhoneNumber,
        otherNames,
        pep,
        phoneNo,
        signature,
        utilityBill,
        idCardBack,
        otherNationalityType,
        proofOfAddressVerification,
        residentPermit,
      } = payload;

      const formDataObject = new FormData();

      formDataObject.append("lastName", lastName);
      formDataObject.append("firstName", firstName);
      formDataObject.append("otherNames", otherNames);
      formDataObject.append("address", address);
      formDataObject.append("gender", gender);
      formDataObject.append("dateOfBirth", dateOfBirth);
      formDataObject.append("phoneNo", phoneNo);
      formDataObject.append("nextOfKinName", nextOfKinName);
      formDataObject.append("nextOfKinPhoneNumber", nextOfKinPhoneNumber);
      formDataObject.append("bankVerificationNumber", bankVerificationNumber);
      formDataObject.append("email", email);
      formDataObject.append("nationality", nationality);
      formDataObject.append("pep", pep);
      formDataObject.append("nationalIdentityNo", nationalIdentityNo);

      if (otherNationalityType) {
        formDataObject.append("otherNationalityType", otherNationalityType);
      }

      if (utilityBill) {
        formDataObject.append("utilityBill", utilityBill);
      }

      if (customerPassport) {
        formDataObject.append("customerPassport", customerPassport);
      }

      if (idCardFront) {
        formDataObject.append("idCardFront", idCardFront);
      }

      if (signature) {
        formDataObject.append("signature", signature);
      }

      if (idCardBack) {
        formDataObject.append("idCardBack", idCardBack);
      }

      if (proofOfAddressVerification) {
        formDataObject.append(
          "proofOfAddressVerification",
          proofOfAddressVerification,
        );
      }

      if (residentPermit) {
        formDataObject.append("residentPermit", residentPermit);
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/corporate-accounts/add-signatory`,
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

  const addDirectories = async (payload: IDirectories) => {
    try {
      let token = Cookies.get("token");

      const {
        address,
        bankVerificationNumber,
        customerPassport,
        dateOfBirth,
        email,
        firstName,
        gender,
        idCardFront,
        lastName,
        nationalIdentityNo,
        nationality,
        nextOfKinName,
        nextOfKinPhoneNumber,
        otherNames,
        pep,
        phoneNo,
        signature,
        utilityBill,
        idCardBack,
        otherNationalityType,
        proofOfAddressVerification,
        residentPermit,
      } = payload;

      const formDataObject = new FormData();

      formDataObject.append("lastName", lastName);
      formDataObject.append("firstName", firstName);
      formDataObject.append("otherNames", otherNames);
      formDataObject.append("address", address);
      formDataObject.append("gender", gender);
      formDataObject.append("dateOfBirth", dateOfBirth);
      formDataObject.append("phoneNo", phoneNo);
      formDataObject.append("nextOfKinName", nextOfKinName);
      formDataObject.append("nextOfKinPhoneNumber", nextOfKinPhoneNumber);
      formDataObject.append("bankVerificationNumber", bankVerificationNumber);
      formDataObject.append("email", email);
      formDataObject.append("nationality", nationality);
      formDataObject.append("pep", pep);
      formDataObject.append("nationalIdentityNo", nationalIdentityNo);

      if (otherNationalityType) {
        formDataObject.append("otherNationalityType", otherNationalityType);
      }

      if (utilityBill) {
        formDataObject.append("utilityBill", utilityBill);
      }

      if (customerPassport) {
        formDataObject.append("customerPassport", customerPassport);
      }

      if (idCardFront) {
        formDataObject.append("idCardFront", idCardFront);
      }

      if (signature) {
        formDataObject.append("signature", signature);
      }

      if (idCardBack) {
        formDataObject.append("idCardBack", idCardBack);
      }

      if (proofOfAddressVerification) {
        formDataObject.append(
          "proofOfAddressVerification",
          proofOfAddressVerification,
        );
      }

      if (residentPermit) {
        formDataObject.append("residentPermit", residentPermit);
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/corporate-accounts/add-director`,
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

  const loadCountries = async () => {
    try {
      let token = Cookies.get("token");

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/countries`,
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
    addOrganisationInfo,
    uploadCertificates,
    addDirectories,
    addSignatories,
    loadCountries,
  };
}
