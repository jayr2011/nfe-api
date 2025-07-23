import { NfeDto } from '../dto/nfeDto';
import { NfeEntity } from '../../../src/entity/nfe.entity';

export class NfeMapper {
  static toEntity(dto: NfeDto) {
    const entity = new NfeEntity();
    entity.issuerData = { ...dto.issuerData };
    entity.recipientData = { ...dto.recipientData };
    entity.servicesDescription = { ...dto.servicesDescription };
    entity.aditionalInfo = dto.aditionalInfo ?? '';
    entity.issqnValue = dto.issqnValue;
    entity.cofinsValue = dto.cofinsValue;
    entity.inssValue = dto.inssValue;
    entity.irValue = dto.irValue;
    entity.csllValue = dto.csllValue;
    entity.pisPasepValue = dto.pisPasepValue;
    entity.totalInvoiceValue = dto.totalInvoiceValue ?? 0;
    entity.netValue = dto.netValue ?? 0;
    entity.estimatedTaxesValue = dto.estimatedTaxesValue;

    return entity;
  }

  static toDto(entity: NfeEntity) {
    const dto = new NfeDto();
    dto.id = entity.id;
    dto.issuerData = { ...entity.issuerData };
    dto.recipientData = { ...entity.recipientData };
    dto.servicesDescription = { ...entity.servicesDescription };
    dto.aditionalInfo = entity.aditionalInfo ?? '';
    dto.issqnValue = entity.issqnValue;
    dto.cofinsValue = entity.cofinsValue;
    dto.inssValue = entity.inssValue;
    dto.irValue = entity.irValue;
    dto.csllValue = entity.csllValue;
    dto.pisPasepValue = entity.pisPasepValue;
    dto.totalInvoiceValue = entity.totalInvoiceValue ?? 0;
    dto.netValue = entity.netValue ?? 0;
    dto.estimatedTaxesValue = entity.estimatedTaxesValue;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
