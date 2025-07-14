import { Injectable } from '@nestjs/common';
import { NfeEntity } from 'src/entity/nfe.entity';
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

@Injectable()
export class NfeService {
  constructor(
    @InjectRepository(NfeEntity)
    private repo: Repository<NfeEntity>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number): Promise<NfeEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async delete(id: number): Promise<{ message: string; deleted: boolean }> {
    const nfe = await this.findOne(id);
    if (!nfe) {
      return { message: 'Invoice not found', deleted: false };
    }

    await this.repo.delete(id);
    return { message: 'Invoice successfully deleted', deleted: true };
  }

  async deleteAll(): Promise<{ message: string; deletedCount: number }> {
    const allNfes = await this.repo.find();
    const count = allNfes.length;

    if (count === 0) {
      return {
        message: 'No invoices found to delete',
        deletedCount: 0,
      };
    }

    await this.repo.clear();
    return {
      message: `${count} invoice(s) successfully deleted`,
      deletedCount: count,
    };
  }

  async update(id: number, nfe: NfeEntity): Promise<NfeEntity> {
    const existingNfe = await this.findOne(id);
    if (!existingNfe) {
      throw new Error('Invoice not found');
    }

    existingNfe.issuerData = nfe.issuerData;
    existingNfe.recipientData = nfe.recipientData;
    existingNfe.servicesDescription = nfe.servicesDescription;
    existingNfe.aditionalInfo = nfe.aditionalInfo;

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

    return this.repo.save(existingNfe);
  }

  create(nfe: NfeEntity): Promise<NfeEntity> {
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
      nfe.servicesDescription.discount,
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

    const note = this.repo.create(nfe);
    return this.repo.save(note);
  }
}
