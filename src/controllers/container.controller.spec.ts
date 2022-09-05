import {Test, TestingModule} from '@nestjs/testing';
import {ContainerController} from "./container.controller";
import {ContainerService} from "../services/container.service";
import {ContainerBasicAdapter} from "../adapters/container.adapter";

describe('Container logic suite test', () => {
  let containerController: ContainerController;


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContainerController],
      providers: [ContainerBasicAdapter,ContainerService],
    }).compile();

    containerController = app.get<ContainerController>(ContainerController);

  });

  describe('When it does not exists an good option for the budget ', () => {
    it('Should return empty array "', async () => {
      const expectedResponse = {containers: []};
      const request = {
        budget: 1610,
        data: [
          {
            name: "C1",
            transportCost: 5000,
            containerPrice: 10000
          },
          {
            name: "C2",
            transportCost: 2000,
            containerPrice: 1000
          },
          {
            name: "C3",
            transportCost: 6000,
            containerPrice: 500000
          }
        ]
      }
      expect(await containerController.selectContainers(request)).toEqual(expectedResponse);
    });
  });

  describe('When exists options to select regarding budget and containers', () => {
    it('Should return empty array "', async () => {
      const expectedResponse = {containers: ["C1", "C2", "C6", "C7"]};
      const request =
          {
            budget: 1610,
            data: [
              {
                name: "C1",
                transportCost: 327,
                containerPrice: 7630
              },
              {
                name: "C2",
                transportCost: 422,
                containerPrice: 9495
              },
              {
                name: "C3",
                transportCost: 241,
                containerPrice: 6025
              },
              {
                name: "C4",
                transportCost: 634,
                containerPrice: 12680
              },
              {
                name: "C5",
                transportCost: 712,
                containerPrice: 14240
              },
              {
                name: "C6",
                transportCost: 308,
                containerPrice: 6160
              },
              {
                name: "C7",
                transportCost: 551,
                containerPrice: 13224
              }
            ]
          }
      expect(await containerController.selectContainers(request)).toEqual(expectedResponse);
    });
  });
});
