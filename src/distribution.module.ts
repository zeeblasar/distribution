import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContainerController } from './controllers/container.controller';
import { ContainerService } from './services/container.service';
import {ContainerBasicAdapter} from "./adapters/container.adapter";
import {DistributionConfig} from "./distribution.config";

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [ContainerController],
  providers: [ContainerBasicAdapter, ContainerService, DistributionConfig],
})
export class DistributionModule {}
