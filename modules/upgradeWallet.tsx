import axios from "axios";
import Cookies from "js-cookie";

export const upgradeWalletTest = async (payload: any) => {
  const token = Cookies.get("token");

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
  console.log("formData: " + JSON.stringify(payload));

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
  console.log(data);
  return data;
};
