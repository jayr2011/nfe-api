import { Module } from '@nestjs/common';
import { NfeModule } from './nfe/nfe.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
