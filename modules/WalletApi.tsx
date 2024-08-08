import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = Cookies.get("token");

      // If the token is present, set the authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loadWallet: builder.query<any, void>({
      query: () => "/api/v1/wallet",
    }),
    upgradeWallet: builder.mutation({
      query: (payload) => {
        const {
          selfie,
          signature,
          utilityBill,
          document,
          idType,
          idIssueDate,
          idExpiryDate,
          idNumber,
          houseNumber,
          streetName,
          city,
          localGovernment,
          state,
          nearestLandmark,
        } = payload;
        // console.log("formData: " + JSON.stringify(payload));

        const formDataObject = new FormData();
        formDataObject.append("selfie", selfie);
        formDataObject.append("signature", signature);
        formDataObject.append("utilityBill", utilityBill);
        formDataObject.append("document", document);
        formDataObject.append("idType", idType);
        formDataObject.append("idIssueDate", idIssueDate);
        formDataObject.append("idExpiryDate", idExpiryDate);
        formDataObject.append("idNumber", idNumber);
        formDataObject.append("houseNumber", houseNumber);
        formDataObject.append("streetName", streetName);
        formDataObject.append("city", city);
        formDataObject.append("localGovernment", localGovernment);
        formDataObject.append("state", state);
        formDataObject.append("nearestLandmark", nearestLandmark);
        console.log("formDataObject: " + formDataObject);

        return {
          url: "/api/v1/upgrade-wallet",
          method: "POST",
          body: formDataObject,

          headers: {
            "Content-Type": `multipart/form-data; boundary=${formDataObject}`,
          },
        };
      },
    }),
  }),
});

export const { useLoadWalletQuery, useUpgradeWalletMutation } = walletApi;
