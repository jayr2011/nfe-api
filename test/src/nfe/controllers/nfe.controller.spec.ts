import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { NfeController } from '../../../../src/nfe/controllers/nfe.controller';
import { NfeService } from '../../../../src/nfe/services/nfe.service';
import { mockNfe, mockNfes } from '../../../mocks/nfe.mock';
import { PdfService } from '../../../../src/pdf/pdf.service';
const mockNfeDto = {
  issuerData: {
    cpfCnpj: '12345678901',
    corporateName: 'Empresa Teste',
    tradeName: 'Teste LTDA',
    address: 'Rua Teste, 123',
    zipCode: '12345-678',
    phone: '11999999999',
    email: 'teste@empresa.com',
    stateRegistration: '123456789',
    municipalRegistration: '987654321',
    taxRegime: 'Simples Nacional',
  },
  recipientData: {
    cpfCnpj: '98765432100',
    corporateName: 'Cliente Teste',
    zipCode: '87654-321',
    address: 'Av. Cliente, 456',
    city: 'São Paulo',
    stateRegistration: '987654321',
    municipalRegistration: '123456789',
    phone: '11988888888',
  },
  servicesDescription: {
    serviceCode: '001',
    description: 'Serviço de Teste',
    unitValue: '100',
    quantity: 2,
    discount: 10,
  },
  createdAt: new Date(),
  aditionalInfo: 'Informações adicionais de teste',
};

const mockUpdtedNfeDto = {
  aditionalInfo: '',
  cofinsValue: undefined,
  createdAt: undefined,
  csllValue: undefined,
  estimatedTaxesValue: undefined,
  id: undefined,
  inssValue: undefined,
  irValue: undefined,
  issqnValue: undefined,
  issuerData: {},
  netValue: 0,
  pisPasepValue: undefined,
  recipientData: {},
  servicesDescription: {},
  totalInvoiceValue: 0,
};

describe('NfeController', () => {
  let controller: NfeController;
  let nfeService: NfeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfeController],
      providers: [
        {
          provide: NfeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            deleteAll: jest.fn(),
          },
        },
        {
          provide: PdfService,
          useValue: {
            generatePdf: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NfeController>(NfeController);
    nfeService = module.get<NfeService>(NfeService);
  });

  describe('Controller definition', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('NFE creation', () => {
    it('should create a new NFE record', async () => {
      jest.spyOn(nfeService, 'create').mockResolvedValue(mockNfe);
      const result = await controller.createNote(mockNfeDto);
      expect(result).toMatchObject(mockNfe);
    });
  });

  describe('NFE findAll', () => {
    it('should return all NFE records', async () => {
      (nfeService.findAll as jest.Mock).mockResolvedValue(mockNfes);
      const result = await controller.findAll();
      expect(result).toEqual(mockNfes);
    });
  });

  describe('NFE query by ID', () => {
    it('should return a specific NFE record by ID', async () => {
      (nfeService.findOne as jest.Mock).mockResolvedValue(mockNfe);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockNfe);
    });

    it('should throw 404 if NFE record not found', async () => {
      (nfeService.findOne as jest.Mock).mockResolvedValue(null);
      await expect(controller.findOne('999')).rejects.toThrow(
        'Invoice not found',
      );
    });
  });

  describe('Delete all NFEs', () => {
    it('should delete all NFE records', async () => {
      const mockResult = { deletedCount: 10 };
      (nfeService.deleteAll as jest.Mock).mockResolvedValue(mockResult);
      const result = await controller.deleteAll();
      expect(result).toEqual(mockResult);
    });

    it('should throw 500 if there is an error deleting all invoices', async () => {
      (nfeService.deleteAll as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );
      await expect(controller.deleteAll()).rejects.toThrow(
        'Error deleting all invoices',
      );
    });
  });

  describe('Delete NFE by ID', () => {
    it('should delete a specific NFE record by ID', async () => {
      const mockResult = { deleted: true };
      (nfeService.delete as jest.Mock).mockResolvedValue(mockResult);
      const result = await controller.deleteOne('1');
      expect(result).toEqual(mockResult);
    });

    it('should throw 404 if NFE record not found for deletion', async () => {
      const mockResult = { deleted: false, message: 'Error deleting invoice' };
      (nfeService.delete as jest.Mock).mockResolvedValue(mockResult);
      await expect(controller.deleteOne('999')).rejects.toThrow(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect.any(HttpException),
      );
      await expect(controller.deleteOne('999')).rejects.toThrow(
        'Error deleting invoice',
      );
    });
  });

  describe('Update NFE by ID', () => {
    it('should update a specific NFE record by ID', async () => {
      const mockUpdated = { mockNfe };
      (nfeService.update as jest.Mock).mockResolvedValue(mockUpdated);
      const result = await controller.updateNote('1', mockNfe);
      expect(result).toEqual(mockUpdtedNfeDto);
    });

    it('should throw 404 if NFE record not found for update', async () => {
      (nfeService.update as jest.Mock).mockResolvedValue(undefined);
      await expect(controller.updateNote('999', mockNfe)).rejects.toThrow(
        'Invoice not found for update',
      );
    });
  });
});
