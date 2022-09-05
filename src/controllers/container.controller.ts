import {Body, Controller, Get, Inject} from '@nestjs/common';
import {ContainerService} from '../services/container.service';
import {ContainerSelectRequest} from "../schemas/in/container";
import {ContainerSelectResponse} from "../schemas/out/container";
import {ContainerBasicAdapter} from "../adapters/container.adapter";
import {DistributionConfig}  from "../distribution.config";

@Controller()
export class ContainerController {
    constructor(
        private readonly containerService: ContainerService,
        private readonly containerAdapter: ContainerBasicAdapter,
        private readonly config: DistributionConfig) {
    }

    @Get("containers")
    async selectContainers(@Body() request: ContainerSelectRequest): Promise<ContainerSelectResponse> {
        const {budget, data} = request;
        const selectedContainers: string[] = await this.containerService.selectContainers(budget, data);
        const excludedContainers = await this.containerService.excludedContainers(selectedContainers, data);
        console.log("Dbname " + this.config.getDbName());
        //TODO send to kafka or queue to process not selected containers and save information
        return this.containerAdapter.fromContainerArrayToResponse(selectedContainers);
    }
}
