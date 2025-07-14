import Nfe from '../../../../src/interfaces/nfe.interface';

describe('Nfe interface', () => {
  it('should allow creation of a valid Nfe object', () => {
    const nfe: Nfe = {
      issuerData: {
        cpfCnpj: '12345678900',
        corporateName: 'Empresa Ltda',
        tradeName: 'Empresa',
        address: 'Rua 1',
        zipCode: '12345-678',
        phone: '11999999999',
        email: 'empresa@email.com',
        stateRegistration: '123456',
        municipalRegistration: '654321',
        taxRegime: 'Simples Nacional',
      },
      recipientData: {
        cpfCnpj: '98765432100',
        corporateName: 'Cliente Ltda',
        zipCode: '87654-321',
        address: 'Rua 2',
        city: 'Cidade',
        stateRegistration: '654321',
        municipalRegistration: '123456',
        phone: '11988888888',
      },
      servicesDescription: {
        serviceCode: '001',
        description: 'Serviço de teste',
        unitValue: 100,
        quantity: 2,
        discount: 10,
      },
      aditionalInfo: 'Informação adicional',
      issqnValue: 5,
      pisValue: 2,
      cofinsValue: 3,
      inssValue: 1,
      irValue: 1,
      csllValue: 1,
      pisPasepValue: 2,
      totalInvoiceValue: 190,
      netValue: 180,
    };
    expect(nfe).toBeDefined();
    expect(nfe.issuerData.cpfCnpj).toBe('12345678900');
    expect(nfe.recipientData.cpfCnpj).toBe('98765432100');
    expect(nfe.servicesDescription.unitValue).toBe(100);
    expect(nfe.totalInvoiceValue).toBe(190);
    expect(nfe.netValue).toBe(180);
  });
});
