import { Test, TestingModule } from '@nestjs/testing';
import { NfeController } from '../../../../src/nfe/controllers/nfe.controller';
import { NfeService } from '../../../../src/nfe/services/nfe.service';
import { mockNfe, mockNfes } from '../../../mocks/nfe.mock';

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
      const result = await controller.createNote(mockNfe);
      expect(result).toEqual(mockNfe);
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
      const mockResult = { deleted: false, message: 'Invoice not found' };
      (nfeService.delete as jest.Mock).mockResolvedValue(mockResult);
      await expect(controller.deleteOne('999')).rejects.toThrow(
        'Invoice not found',
      );
    });
  });

  describe('Update NFE by ID', () => {
    it('should update a specific NFE record by ID', async () => {
      const mockUpdated = { mockNfe };
      (nfeService.update as jest.Mock).mockResolvedValue(mockUpdated);
      const result = await controller.updateNote('1', mockNfe);
      expect(result).toEqual(mockUpdated);
    });

    it('should throw 404 if NFE record not found for update', async () => {
      (nfeService.update as jest.Mock).mockResolvedValue(undefined);
      await expect(controller.updateNote('999', mockNfe)).rejects.toThrow(
        'Invoice not found for update',
      );
    });
  });
});
