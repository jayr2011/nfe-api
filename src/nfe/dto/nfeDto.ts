import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class IssuerDataDto {
  @IsString()
  cpfCnpj: string;

  @IsString()
  corporateName: string;

  @IsString()
  tradeName: string;

  @IsString()
  address: string;

  @IsString()
  zipCode: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  stateRegistration: string;

  @IsString()
  municipalRegistration: string;

  @IsString()
  taxRegime: string;
}

class RecipientDataDto {
  @IsString()
  cpfCnpj: string;

  @IsString()
  corporateName: string;

  @IsString()
  zipCode: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  stateRegistration: string;

  @IsString()
  municipalRegistration: string;

  @IsString()
  phone: string;
}

class ServicesDescriptionDto {
  @IsString()
  serviceCode: string;

  @IsString()
  description: string;

  @IsString()
  unitValue: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  discount: number;
}

export class NfeDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ValidateNested()
  @Type(() => IssuerDataDto)
  issuerData: IssuerDataDto;

  @ValidateNested()
  @Type(() => RecipientDataDto)
  recipientData: RecipientDataDto;

  @ValidateNested()
  @Type(() => ServicesDescriptionDto)
  servicesDescription: ServicesDescriptionDto;

  @IsOptional()
  @IsString()
  aditionalInfo?: string;

  @IsOptional()
  @IsNumber()
  issqnValue?: number;

  @IsOptional()
  @IsNumber()
  cofinsValue?: number;

  @IsOptional()
  @IsNumber()
  inssValue?: number;

  @IsOptional()
  @IsNumber()
  irValue?: number;

  @IsOptional()
  @IsNumber()
  csllValue?: number;

  @IsOptional()
  @IsNumber()
  pisPasepValue?: number;

  @IsOptional()
  @IsNumber()
  totalInvoiceValue?: number;

  @IsOptional()
  @IsNumber()
  netValue?: number;

  @IsOptional()
  @IsNumber()
  estimatedTaxesValue?: number;
}
