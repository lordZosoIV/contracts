import {Contract} from "ethers";

const { expect } = require('chai');
import { ethers } from "hardhat";

describe('Test1_1', function () {
    let testTask:Contract;

    before(async () => {
        const TestTask1 = await ethers.getContractFactory('Task1_1');
        testTask = await TestTask1.deploy();
        await testTask.deployed();
    });

    it('Should return the sum of even numbers in an array', async function () {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const expectedSum = 2 + 4 + 6 + 8 + 10;

        const sum = await testTask.sumEvenNumbers(numbers);
        expect(sum).to.equal(expectedSum);
    });

    it('Should return 0 if the array contains only odd numbers', async function () {
        const numbers = [1, 3, 5, 7, 9];
        const expectedSum = 0;

        const sum = await testTask.sumEvenNumbers(numbers);
        expect(sum).to.equal(expectedSum);
    });

    it('Should return 0 if the array is empty', async function () {
        const numbers: never[] = [];
        const expectedSum = 0;

        const sum = await testTask.sumEvenNumbers(numbers);
        expect(sum).to.equal(expectedSum);
    });
});
