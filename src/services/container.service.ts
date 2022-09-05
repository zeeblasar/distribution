import {Injectable} from '@nestjs/common';
import {Container} from "../model/container";

@Injectable()
export class ContainerService {

    //TODO unit test to this function
    orderContainersByName(current: string, previous: string): number {
        return parseInt(current.substring(1)) - parseInt(previous.substring(1));
    }

    //TODO unit test to this function
    orderContainerByPrice(current: Container, previous: Container): number {
        return current.containerPrice - previous.containerPrice;
    }

    //TODO valid test to this function
    async selectBestContainers(containers: Container[], budget: number): Promise<string[]> {
        let bestSelection = null;
        containers.forEach((container, i) => {
            let consumedBudget = container.transportCost;
            let totalPrice = container.containerPrice;
            const names = [container.name];
            for (let j = i + 1; j < containers.length; j++) {
                const currentContainer = containers.at(j);
                if (consumedBudget + currentContainer.transportCost <= budget) {
                    consumedBudget += currentContainer.transportCost;
                    totalPrice += currentContainer.containerPrice;
                    names.push(currentContainer.name)
                }
            }

            if (consumedBudget <= budget) {
                bestSelection = (!bestSelection || (totalPrice >= bestSelection.totalPrice)
                    ? {totalPrice: totalPrice, containers: names.sort(this.orderContainersByName)} :
                    bestSelection);
            }
        });

        return bestSelection ? bestSelection.containers : [];
    }

    async excludedContainers(selectedContainers:string[], containers:Container[]){
        return containers.filter(container => !selectedContainers.includes(container.name));
    }

    //TODO create Dto response
    //TODO add swagger capability
    //TODO add cache data and safe model
    //TODO create diagrams

    //TODO valid test to this function
    async selectContainers(budget: number, containers: Container[]): Promise<string[]> {
        const sortedContainersByPrice = containers.sort(this.orderContainerByPrice);
        return await this.selectBestContainers(sortedContainersByPrice, budget);
    }
}

