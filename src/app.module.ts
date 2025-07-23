import { Module } from '@nestjs/common';
import { NfeModule } from './nfe/nfe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfService } from './pdf/pdf.service';
import { RenderNfeController } from './render-nfe/render-nfe.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NfeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  providers: [PdfService],
  controllers: [RenderNfeController],
})
export class AppModule {}
