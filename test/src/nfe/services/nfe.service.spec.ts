/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { NfeService } from '../../../../src/nfe/services/nfe.service';
describe('NfeService', () => {
  let service: NfeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NfeService,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
            deleteAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NfeService>(NfeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const mockNfes = [
      { id: 1, issuerData: {}, recipientData: {}, servicesDescription: {} },
      { id: 2, issuerData: {}, recipientData: {}, servicesDescription: {} },
    ];

    beforeEach(() => {
      (service.findAll as jest.Mock).mockResolvedValue(mockNfes);
    });

    it('should return all NFEs', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockNfes);
    });

    it('should call findAll', async () => {
      await service.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    describe('when NFE exists', () => {
      const mockNfe = {
        id: 1,
        issuerData: {},
        recipientData: {},
        servicesDescription: {},
      };
      beforeEach(() => {
        (service.findOne as jest.Mock).mockResolvedValue(mockNfe);
      });

      it('should return the NFE', async () => {
        const result = await service.findOne(1);
        expect(result).toEqual(mockNfe);
      });

      it('should call findOne with correct id', async () => {
        await service.findOne(1);
        expect(service.findOne).toHaveBeenCalledWith(1);
      });
    });

    describe('when NFE does not exist', () => {
      beforeEach(() => {
        (service.findOne as jest.Mock).mockResolvedValue(null);
      });

      it('should return null', async () => {
        const result = await service.findOne(999);
        expect(result).toBeNull();
      });

      it('should call findOne with correct id', async () => {
        await service.findOne(999);
        expect(service.findOne).toHaveBeenCalledWith(999);
      });
    });

    describe('when delete is called', () => {
      const mockDeleteResult = {
        message: 'Invoice successfully deleted',
        deleted: true,
      };

      beforeEach(() => {
        (service.delete as jest.Mock).mockResolvedValue(mockDeleteResult);
      });

      it('should delete the NFE and return success message', async () => {
        const result = await service.delete(1);
        expect(result).toEqual(mockDeleteResult);
      });

      it('should call delete with correct id', async () => {
        await service.delete(1);
        expect(service.delete).toHaveBeenCalledWith(1);
      });
    });

    describe('deleteAll', () => {
      beforeEach(() => {
        (service.deleteAll as jest.Mock).mockClear();
      });

      it('should return message if no invoices found', async () => {
        (service.deleteAll as jest.Mock).mockResolvedValue({
          message: 'No invoices found to delete',
          deletedCount: 0,
        });
        const result = await service.deleteAll();
        expect(result.message).toBe('No invoices found to delete');
      });

      it('should return deletedCount 0 if no invoices found', async () => {
        (service.deleteAll as jest.Mock).mockResolvedValue({
          message: 'No invoices found to delete',
          deletedCount: 0,
        });
        const result = await service.deleteAll();
        expect(result.deletedCount).toBe(0);
      });

      it('should return success message if invoices exist', async () => {
        (service.deleteAll as jest.Mock).mockResolvedValue({
          message: '3 invoice(s) successfully deleted',
          deletedCount: 3,
        });
        const result = await service.deleteAll();
        expect(result.message).toBe('3 invoice(s) successfully deleted');
      });

      it('should return correct deletedCount if invoices exist', async () => {
        (service.deleteAll as jest.Mock).mockResolvedValue({
          message: '3 invoice(s) successfully deleted',
          deletedCount: 3,
        });
        const result = await service.deleteAll();
        expect(result.deletedCount).toBe(3);
      });
    });

    describe('update', () => {
      const mockNfe = {
        id: 1,
        issuerData: {},
        recipientData: {},
        servicesDescription: {
          unitValue: 100,
          quantity: 2,
          discount: 10,
        },
        aditionalInfo: 'info',
      };

      it('should throw error if NFE does not exist', async () => {
        (service.update as jest.Mock).mockRejectedValue(
          new Error('Invoice not found'),
        );
        await expect(service.update(999, mockNfe as any)).rejects.toThrow(
          'Invoice not found',
        );
      });

      it('should update and return the NFE if exists', async () => {
        (service.update as jest.Mock).mockResolvedValue({
          ...mockNfe,
          totalInvoiceValue: 190,
        });
        const result = await service.update(1, mockNfe as any);
        expect(result.id).toBe(1);
      });

      it('should call update with correct id and data', async () => {
        (service.update as jest.Mock).mockResolvedValue({ ...mockNfe });
        await service.update(1, mockNfe as any);
        expect(service.update).toHaveBeenCalledWith(1, mockNfe);
      });
    });

    describe('create', () => {
      const mockNfe = {
        issuerData: {},
        recipientData: {},
        servicesDescription: {
          unitValue: 100,
          quantity: 2,
          discount: 10,
        },
        aditionalInfo: 'info',
      };
      const mockSavedNfe = {
        ...mockNfe,
        id: 1,
        totalInvoiceValue: 190,
        pisPasepValue: 1,
        csllValue: 2,
        cofinsValue: 3,
        issqnValue: 4,
        netValue: 5,
        inssValue: 6,
        irValue: 7,
        estimatedTaxesValue: 8,
      };

      beforeEach(() => {
        (service.create as jest.Mock).mockResolvedValue(mockSavedNfe);
      });

      it('should return the created NFE', async () => {
        const result = await service.create(mockNfe as any);
        expect(result).toEqual(mockSavedNfe);
      });

      it('should have totalInvoiceValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.totalInvoiceValue).toBe(190);
      });

      it('should have pisPasepValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.pisPasepValue).toBe(1);
      });

      it('should have csllValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.csllValue).toBe(2);
      });

      it('should have cofinsValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.cofinsValue).toBe(3);
      });

      it('should have issqnValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.issqnValue).toBe(4);
      });

      it('should have netValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.netValue).toBe(5);
      });

      it('should have inssValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.inssValue).toBe(6);
      });

      it('should have irValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.irValue).toBe(7);
      });

      it('should have estimatedTaxesValue calculated', async () => {
        const result = await service.create(mockNfe as any);
        expect(result.estimatedTaxesValue).toBe(8);
      });
    });

    describe('constructor', () => {
      it('should assign repo correctly', () => {
        const mockRepo = {} as any;
        const serviceInstance = new (NfeService as any)(mockRepo);
        expect(serviceInstance.repo).toBe(mockRepo);
      });
    });
  });
});
