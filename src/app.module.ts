import { Module } from '@nestjs/common';
import { NfeModule } from './nfe/nfe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfService } from './pdf/pdf.service';
import { RenderNfeController } from './render-nfe/render-nfe.controller';

@Module({
  imports: [
    NfeModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nfe.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  providers: [PdfService],
  controllers: [RenderNfeController],
})
export class AppModule {}
