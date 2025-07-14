import { Module } from '@nestjs/common';
import { NfeService } from './nfe.service';
import { NfeController } from './nfe.controller';
import { NfeEntity } from '../entity/nfe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NfeEntity])],
  providers: [NfeService],
  controllers: [NfeController],
})
export class NfeModule {}
