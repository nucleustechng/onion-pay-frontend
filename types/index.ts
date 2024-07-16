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
