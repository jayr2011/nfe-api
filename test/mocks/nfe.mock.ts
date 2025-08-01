export const mockNfe = {
  id: 1,
  issuerData: {
    cpfCnpj: '12345678901',
    corporateName: 'Issuer Corp',
    tradeName: 'Issuer',
    address: 'Street 1',
    zipCode: '12345-678',
    phone: '123456789',
    email: 'issuer@example.com',
    stateRegistration: '123456',
    municipalRegistration: '654321',
    taxRegime: 'Simples Nacional',
  },
  recipientData: {
    cpfCnpj: '98765432100',
    corporateName: 'Recipient Corp',
    zipCode: '87654-321',
    address: 'Street 2',
    city: 'City',
    stateRegistration: '654321',
    municipalRegistration: '123456',
    phone: '987654321',
  },
  servicesDescription: {
    serviceCode: '001',
    description: 'Service Description',
    unitValue: '100',
    quantity: 2,
    discount: 10,
  },
  totalInvoiceValue: 190,
  netValue: 150,
  pisPasepValue: 1,
  csllValue: 1,
  cofinsValue: 1,
  issqnValue: 1,
  inssValue: 1,
  irValue: 1,
  estimatedTaxesValue: 6,
  createdAt: new Date(),
};

export const mockNfes = [
  {
    id: 1,
    issuerData: {
      cpfCnpj: '123',
      corporateName: '',
      tradeName: '',
      address: '',
      zipCode: '',
      phone: '',
      email: '',
      stateRegistration: '',
      municipalRegistration: '',
      taxRegime: '',
    },
    recipientData: {
      cpfCnpj: '456',
      corporateName: '',
      zipCode: '',
      address: '',
      city: '',
      stateRegistration: '',
      municipalRegistration: '',
      phone: '',
    },
    servicesDescription: {
      serviceCode: '',
      description: '',
      unitValue: '0',
      quantity: 0,
      discount: 0,
    },
    totalInvoiceValue: 0,
    netValue: 0,
    pisPasepValue: 0,
    csllValue: 0,
    cofinsValue: 0,
    issqnValue: 0,
    inssValue: 0,
    irValue: 0,
    estimatedTaxesValue: 0,
    createdAt: new Date(),
  },
  {
    id: 2,
    issuerData: {
      cpfCnpj: '789',
      corporateName: '',
      tradeName: '',
      address: '',
      zipCode: '',
      phone: '',
      email: '',
      stateRegistration: '',
      municipalRegistration: '',
      taxRegime: '',
    },
    recipientData: {
      cpfCnpj: '012',
      corporateName: '',
      zipCode: '',
      address: '',
      city: '',
      stateRegistration: '',
      municipalRegistration: '',
      phone: '',
    },
    servicesDescription: {
      serviceCode: '',
      description: '',
      unitValue: '0',
      quantity: 0,
      discount: 0,
    },
    totalInvoiceValue: 0,
    netValue: 0,
    pisPasepValue: 0,
    csllValue: 0,
    cofinsValue: 0,
    issqnValue: 0,
    inssValue: 0,
    irValue: 0,
    estimatedTaxesValue: 0,
    createdAt: new Date(),
  },
];
