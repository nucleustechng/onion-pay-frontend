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
  utilityBill: any; // Optional
  customerPassport: any; // Optional
  idCardFront: any; // Optional
  signature: any; // Optional
  idCardBack?: any; // Optional
  proofOfAddressVerification?: string; // Optional
  residentPermit?: string; // Optional
}
