export default interface Nfe {
  issuerData: {
    cpfCnpj: string;
    corporateName: string;
    tradeName: string;
    address: string;
    zipCode: string;
    phone: string;
    email: string;
    stateRegistration: string;
    municipalRegistration: string;
    taxRegime: string;
  };
  recipientData: {
    cpfCnpj: string;
    corporateName: string;
    zipCode: string;
    address: string;
    city: string;
    stateRegistration: string;
    municipalRegistration: string;
    phone: string;
  };
  servicesDescription: {
    serviceCode: string;
    description: string;
    unitValue: number;
    quantity: number;
    discount: number;
  };
  aditionalInfo?: string;
  issqnValue?: number;
  pisValue?: number;
  cofinsValue?: number;
  inssValue?: number;
  irValue?: number;
  csllValue?: number;
  pisPasepValue?: number;
  totalInvoiceValue: number;
  netValue: number;
}
