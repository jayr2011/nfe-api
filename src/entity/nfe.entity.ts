import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class NfeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  issuerData: {
    cpfCnpj: string;
    corporateName: string;
    tradeName: string;
    address: string;
    zipCode: string;
    phone: string;
    email: string;
    stateRegistration: string;
    municipalRegistration: string;
    taxRegime: string;
  };

  @Column('simple-json')
  recipientData: {
    cpfCnpj: string;
    corporateName: string;
    zipCode: string;
    address: string;
    city: string;
    stateRegistration: string;
    municipalRegistration: string;
    phone: string;
  };

  @Column('simple-json')
  servicesDescription: {
    serviceCode: string;
    description: string;
    unitValue: string;
    quantity: number;
    discount: number;
  };

  @Column({ nullable: true })
  aditionalInfo?: string;

  @Column({ nullable: true, type: 'float' })
  issqnValue?: number;

  @Column({ nullable: true, type: 'float' })
  cofinsValue?: number;

  @Column({ nullable: true, type: 'float' })
  inssValue?: number;

  @Column({ nullable: true, type: 'float' })
  irValue?: number;

  @Column({ nullable: true, type: 'float' })
  csllValue?: number;

  @Column({ nullable: true, type: 'float' })
  pisPasepValue?: number;

  @Column('float')
  totalInvoiceValue: number;

  @Column('float')
  netValue: number;

  @Column({ nullable: true, type: 'float' })
  estimatedTaxesValue?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
