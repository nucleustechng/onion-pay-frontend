export interface IOrganisationInfo {
  registrationNumber: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  postalAddress: string;
  taxIDNo: string;
  businessName: string;
  industrialSector: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  businessType: string;
  natureOfBusiness: string;
  dateIncorporated: string;
  businessCommencementDate: string;
}

export interface ICertificateUpload {
  cacCertificate: any;
  proofOfAddressVerification: any;
  utilityBill: any;
  scumlCertificate?: any;
  regulatoryLicenseFintech?: any;
}

export interface ISignatories {
  lastName: string;
  firstName: string;
  otherNames: string;
  address: string;
  gender: "Male" | "Female";
  dateOfBirth: string; // Format: YYYY-MM-DD
  phoneNo: string;
  nextOfKinName: string;
  nextOfKinPhoneNumber: string;
  bankVerificationNumber: string;
  email: string;
  nationality: string;
  otherNationalityType?: string; // Optional, only required if nationality is Non_Nigerian
  pep: "Yes" | "No";
  nationalIdentityNo: string;
  utilityBill: any | null; // Optional
  customerPassport: any | null; // Optional
  idCardFront: any | null; // Optional
  signature: any | null; // Optional
  idCardBack?: any | null; // Optional
  proofOfAddressVerification?: any | null; // Optional
  residentPermit?: any | null; // Optional
}

export interface IDirectories {
  lastName: string;
  firstName: string;
  otherNames: string;
  address: string;
  gender: "Male" | "Female";
  dateOfBirth: string; // Format: YYYY-MM-DD
  phoneNo: string;
  nextOfKinName: string;
  nextOfKinPhoneNumber: string;
  bankVerificationNumber: string;
  email: string;
  nationality: string;
  otherNationalityType?: string; // Optional, only required if nationality is Non_Nigerian
  pep: "Yes" | "No";
  nationalIdentityNo: string;
  utilityBill: any | null; // Optional
  customerPassport: any | null; // Optional
  idCardFront: any | null; // Optional
  signature: any | null; // Optional
  idCardBack?: any | null; // Optional
  proofOfAddressVerification?: any | null; // Optional
  residentPermit?: any | null; // Optional
}


interface Address {
  houseNumber: string;
  streetName: string;
  city: string;
  localGovernment: string;
  state: string;
  nearestLandmark: string;
}

interface DocumentDetails {
  selfie: File | null;
  signature: File | null;
  utilityBill: File | null;
  document: File | null;
}

interface IDDetails {
  idType: string;
  idIssueDate: any; // Unix timestamp in milliseconds
  idExpiryDate: any; // Unix timestamp in milliseconds
  idNumber: string;
}

export interface IUpgradeWalletFormData {
  documentDetails: DocumentDetails;
  idDetails: IDDetails;
  address: Address;

}


