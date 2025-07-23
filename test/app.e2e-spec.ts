/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { mockNfe } from './mocks/nfe.mock';

describe('NFe API (e2e)', () => {
  let app: INestApplication<App>;
  let createdNfeId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete('/nfe/all');
    await app.close();
  });

  describe('/nfe (POST)', () => {
    it('should create a new NFe successfully', () => {
      const nfeData = {
        issuerData: mockNfe.issuerData,
        recipientData: mockNfe.recipientData,
        servicesDescription: mockNfe.servicesDescription,
      };

      return request(app.getHttpServer())
        .post('/nfe/create')
        .send(nfeData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('totalInvoiceValue');
          expect(res.body).toHaveProperty('netValue');
          expect(res.body).toHaveProperty('pisPasepValue');
          expect(res.body).toHaveProperty('csllValue');
          expect(res.body).toHaveProperty('cofinsValue');
          expect(res.body).toHaveProperty('issqnValue');
          expect(res.body).toHaveProperty('netValue');
          expect(res.body).toHaveProperty('inssValue');
          expect(res.body).toHaveProperty('irValue');
          expect(res.body).toHaveProperty('estimatedTaxesValue');
          expect(res.body.issuerData.cpfCnpj).toBe(nfeData.issuerData.cpfCnpj);
          expect(res.body.issuerData.corporateName).toBe(
            nfeData.issuerData.corporateName,
          );
          expect(res.body.recipientData.cpfCnpj).toBe(
            nfeData.recipientData.cpfCnpj,
          );
          createdNfeId = res.body.id;
        });
    });
  });

  describe('/nfe/findAll (GET)', () => {
    it('should return all NFes', () => {
      return request(app.getHttpServer())
        .get('/nfe/findAll')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('/nfe/:id (GET)', () => {
    it('should return a specific NFe by ID', () => {
      return request(app.getHttpServer())
        .get(`/nfe/${createdNfeId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', createdNfeId);
          expect(res.body).toHaveProperty('issuerData');
          expect(res.body).toHaveProperty('recipientData');
          expect(res.body).toHaveProperty('servicesDescription');
        });
    });

    it('should return error 404 for NFe not found', () => {
      return request(app.getHttpServer())
        .get('/nfe/999999')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Invoice not found');
        });
    });
  });

  describe('/nfe/:id (PATCH)', () => {
    it('should update an existing NFe', () => {
      const updateData = {
        issuerData: {
          ...mockNfe.issuerData,
          corporateName: 'Updated Company LTDA',
        },
        recipientData: mockNfe.recipientData,
        servicesDescription: {
          ...mockNfe.servicesDescription,
          description: 'Updated service',
        },
        aditionalInfo: 'Updated information',
      };

      return request(app.getHttpServer())
        .patch(`/nfe/update/${createdNfeId}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.issuerData.corporateName).toBe(
            'Updated Company LTDA',
          );
          expect(res.body.servicesDescription.description).toBe(
            'Updated service',
          );
        });
    });

    it('should return error 404 when trying to update non-existent NFe', () => {
      const updateData = {
        issuerData: mockNfe.issuerData,
        recipientData: mockNfe.recipientData,
        servicesDescription: mockNfe.servicesDescription,
      };

      return request(app.getHttpServer())
        .patch('/nfe/update/999999')
        .send(updateData)
        .expect(500);
    });
  });

  describe('/nfe/:id (DELETE)', () => {
    it('should delete a specific NFe by ID', () => {
      return request(app.getHttpServer())
        .delete(`/nfe/delete/${createdNfeId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('deleted', true);
          expect(res.body).toHaveProperty('message');
        });
    });

    it('should return error 404 when trying to delete non-existent NFe', () => {
      return request(app.getHttpServer()).delete('/nfe/999999').expect(404);
    });
  });

  describe('/nfe/delete/all (DELETE)', () => {
    it('should delete all NFes', async () => {
      const nfeData = {
        issuerData: mockNfe.issuerData,
        recipientData: mockNfe.recipientData,
        servicesDescription: mockNfe.servicesDescription,
        aditionalInfo: 'Test for bulk deletion',
      };

      await request(app.getHttpServer())
        .post('/nfe/create')
        .send(nfeData)
        .expect(201);

      await request(app.getHttpServer())
        .post('/nfe/create')
        .send(nfeData)
        .expect(201);

      return request(app.getHttpServer()).delete('/nfe/delete/all').expect(200);
    });

    it('should confirm there are no more NFes after bulk deletion', () => {
      return request(app.getHttpServer())
        .get('/nfe/findAll')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(0);
        });
    });
  });

  describe('Automatic calculations validation', () => {
    it('should calculate NFe taxes correctly', async () => {
      const nfeData = {
        issuerData: mockNfe.issuerData,
        recipientData: mockNfe.recipientData,
        servicesDescription: {
          serviceCode: '001',
          description: 'Consulting service',
          unitValue: '1000',
          quantity: 1,
          discount: 0,
        },
        aditionalInfo: 'Calculation test',
      };

      const response = await request(app.getHttpServer())
        .post('/nfe/create')
        .send(nfeData)
        .expect(201);

      const nfe = response.body;
      expect(nfe.totalInvoiceValue).toBe(1000);
      expect(nfe.pisPasepValue).toBe(16.5);
      expect(nfe.cofinsValue).toBe(76);
      expect(nfe.csllValue).toBe(90);
      expect(nfe.inssValue).toBe(200);
      expect(nfe.irValue).toBe(150);
      expect(nfe.issqnValue).toBe(20);
      expect(nfe.estimatedTaxesValue).toBe(552.5);
      expect(nfe.netValue).toBe(447.5);
      await request(app.getHttpServer())
        .delete(`/nfe/delete/${nfe.id}`)
        .expect(200);
    });
  });
});
