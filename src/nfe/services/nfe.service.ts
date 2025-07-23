import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NfeEntity } from '../../entity/nfe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  calculateTotalServiceValue,
  calculatePisPasep,
  calculateCsll,
  calculateCofins,
  calculateIssqn,
  calculateInss,
  calculateIr,
  calculateNetValue,
  calculateEstimatedTaxesValue,
} from '../calculations/calculations.services';

import {
  ALIQUOTA_PIS,
  ALIQUOTA_COFINS,
  ALIQUOTA_CSLL,
  ALIQUOTA_INSS,
  ALIQUOTA_IR,
  ALIQUOTA_ISSQN,
} from '../../constants/aliquotas';
import { NfeDto } from '../dto/nfeDto';
import { NfeMapper } from '../mappers/nfe.mapper';

@Injectable()
export class NfeService {
  constructor(
    @InjectRepository(NfeEntity)
    private repository: Repository<NfeEntity>,
  ) {}

  private readonly logger = new Logger(NfeService.name);

  async findAll(): Promise<NfeDto[]> {
    this.logger.log('Fetching all invoices');
    const entities = await this.repository.find();
    return entities.map((entity) => NfeMapper.toDto(entity));
  }

  async findOne(id: number): Promise<NfeDto | null> {
    this.logger.log(`Fetching invoice with ID: ${id}`);
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? NfeMapper.toDto(entity) : null;
  }

  async delete(id: number): Promise<{ message: string; deleted: boolean }> {
    const nfe = await this.findOne(id);
    this.logger.log(`Attempting to delete invoice with ID: ${id}`);
    if (!nfe) {
      this.logger.warn(`Invoice with ID: ${id} not found`);
      return { message: 'Invoice not found', deleted: false };
    }
    await this.repository.delete(id);
    this.logger.log(`Deleting invoice with ID: ${id}`);
    return { message: 'Invoice successfully deleted', deleted: true };
  }

  async deleteAll(): Promise<{ message: string; deletedCount: number }> {
    const allNfes = await this.repository.find();
    const count = allNfes.length;
    if (count === 0) {
      this.logger.warn('No invoices found to delete');
      return {
        message: 'No invoices found to delete',
        deletedCount: 0,
      };
    }

    await this.repository.clear();
    this.logger.log(`Deleting all invoices, count: ${count}`);
    return {
      message: `${count} invoice(s) successfully deleted`,
      deletedCount: count,
    };
  }

  async update(id: number, nfeDto: NfeDto): Promise<NfeEntity> {
    const existingNfe = await this.repository.findOne({ where: { id } });
    if (!existingNfe) {
      this.logger.warn(`Invoice with ID: ${id} not found for update`);
      throw new Error('Invoice not found');
    }

    const nfe = NfeMapper.toEntity(nfeDto);

    existingNfe.issuerData = nfe.issuerData;
    existingNfe.recipientData = nfe.recipientData;
    existingNfe.servicesDescription = nfe.servicesDescription;
    existingNfe.aditionalInfo = nfe.aditionalInfo;
    existingNfe.totalInvoiceValue =
      nfe.totalInvoiceValue * nfe.servicesDescription.quantity -
      nfe.servicesDescription.discount;

    const totalServiceValue = calculateTotalServiceValue(
      nfe.servicesDescription.unitValue,
      nfe.servicesDescription.quantity,
      nfe.servicesDescription.discount,
    );

    existingNfe.totalInvoiceValue = totalServiceValue;
    existingNfe.pisPasepValue = calculatePisPasep(
      totalServiceValue,
      ALIQUOTA_PIS,
    );
    existingNfe.csllValue = calculateCsll(totalServiceValue, ALIQUOTA_CSLL);
    existingNfe.cofinsValue = calculateCofins(
      totalServiceValue,
      ALIQUOTA_COFINS,
    );
    existingNfe.issqnValue = calculateIssqn(totalServiceValue, ALIQUOTA_ISSQN);
    existingNfe.inssValue = calculateInss(totalServiceValue, ALIQUOTA_INSS);
    existingNfe.irValue = calculateIr(totalServiceValue, ALIQUOTA_IR);
    existingNfe.estimatedTaxesValue = calculateEstimatedTaxesValue(
      totalServiceValue,
      ALIQUOTA_PIS,
      ALIQUOTA_COFINS,
      ALIQUOTA_CSLL,
      ALIQUOTA_INSS,
      ALIQUOTA_IR,
      ALIQUOTA_ISSQN,
    );
    existingNfe.netValue = calculateNetValue(
      totalServiceValue,
      existingNfe.pisPasepValue,
      existingNfe.csllValue,
      existingNfe.cofinsValue,
      existingNfe.issqnValue,
      existingNfe.inssValue,
      existingNfe.irValue,
    );
    this.logger.log(`Updating invoice with ID: ${id}`);
    return this.repository.save(existingNfe);
  }

  create(nfeDto: NfeDto): Promise<NfeEntity> {
    const nfe = NfeMapper.toEntity(nfeDto);

    nfe.totalInvoiceValue =
      nfe.totalInvoiceValue * nfe.servicesDescription.quantity -
      nfe.servicesDescription.discount;

    const totalServiceValue = calculateTotalServiceValue(
      nfe.servicesDescription.unitValue,
      nfe.servicesDescription.quantity,
      nfe.servicesDescription.discount,
    );

    const pis = calculatePisPasep(totalServiceValue, ALIQUOTA_PIS);
    const csll = calculateCsll(totalServiceValue, ALIQUOTA_CSLL);
    const cofins = calculateCofins(totalServiceValue, ALIQUOTA_COFINS);
    const issqn = calculateIssqn(totalServiceValue, ALIQUOTA_ISSQN);
    const inss = calculateInss(totalServiceValue, ALIQUOTA_INSS);
    const ir = calculateIr(totalServiceValue, ALIQUOTA_IR);
    const estimatedTaxesValue = calculateEstimatedTaxesValue(
      totalServiceValue,
      ALIQUOTA_PIS,
      ALIQUOTA_COFINS,
      ALIQUOTA_CSLL,
      ALIQUOTA_INSS,
      ALIQUOTA_IR,
      ALIQUOTA_ISSQN,
    );

    const netValue = calculateNetValue(
      totalServiceValue,
      pis,
      csll,
      cofins,
      issqn,
      inss,
      ir,
    );

    nfe.totalInvoiceValue = totalServiceValue;
    nfe.pisPasepValue = pis;
    nfe.csllValue = csll;
    nfe.cofinsValue = cofins;
    nfe.issqnValue = issqn;
    nfe.netValue = netValue;
    nfe.inssValue = inss;
    nfe.irValue = ir;
    nfe.estimatedTaxesValue = estimatedTaxesValue;

    const note = this.repository.create(nfe);
    this.logger.log('Creating a new invoice');
    return this.repository.save(note);
  }
}
