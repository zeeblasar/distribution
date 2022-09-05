import {Test, TestingModule} from '@nestjs/testing';
import {ContainerBasicAdapter} from "../adapters/container.adapter";

describe('Container adapter suite test', () => {
    let containerAdapter: ContainerBasicAdapter;


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [ContainerBasicAdapter],
        }).compile();

        containerAdapter = app.get<ContainerBasicAdapter>(ContainerBasicAdapter);

    });

    describe('When it does not exists an good option for the budget ', () => {
        it('Should return empty array "', () => {
            const expectedResponse = {containers: []};
            const input = []
            expect(containerAdapter.fromContainerArrayToResponse(input)).toEqual(expectedResponse);
        });
    });

    describe('When exists options to select regarding budget and containers', () => {
        it('Should return empty array "', () => {
            const expectedResponse = {containers: ["C1", "C2", "C6", "C7"]};
            const input = ["C1", "C2", "C6", "C7"];
            expect(containerAdapter.fromContainerArrayToResponse(input)).toEqual(expectedResponse);
        });
    });
});
