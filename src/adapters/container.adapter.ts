import {Injectable} from '@nestjs/common';
import {ContainerSelectResponse} from "../schemas/out/container";

@Injectable()
export class ContainerBasicAdapter {
    fromContainerArrayToResponse(containers: string[]) : ContainerSelectResponse {
        return {containers: containers};
    }
}
