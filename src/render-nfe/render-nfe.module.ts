import { Module } from '@nestjs/common';
import { RenderNfeController } from './render-nfe.controller';
import { PdfService } from '../pdf/pdf.service';
import { NfeModule } from '../nfe/nfe.module';

@Module({
  imports: [NfeModule],
  controllers: [RenderNfeController],
  providers: [PdfService],
})
export class RenderNfeModule {}
