import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { expect } from 'chai';

describe('BalanceTracker', function () {
    let balanceTracker: Contract;
    let owner: Signer;
    let user1: Signer;
    let user2: Signer;

    before(async () => {
        const BalanceTracker = await ethers.getContractFactory('BalanceTracker');
        [owner, user1, user2] = await ethers.getSigners();

        balanceTracker = await BalanceTracker.deploy();
        await balanceTracker.deployed();
    });

    it('Should deposit Ether and update balances', async function () {
        const depositAmount = ethers.utils.parseEther('1');
        await balanceTracker.connect(user1).deposit({ value: depositAmount });

        const user1Balance = await balanceTracker.connect(user1).getBalance();
        expect(user1Balance).to.equal(depositAmount);
    });

    it('Should allow users to withdraw Ether', async function () {
        const initialBalance = await balanceTracker.connect(user1).getBalance();
        const withdrawAmount = ethers.utils.parseEther('0.5');

        await balanceTracker.connect(user1).withdraw(withdrawAmount);

        const user1Balance = await balanceTracker.connect(user1).getBalance();
        expect(user1Balance).to.equal(initialBalance.sub(withdrawAmount));
    });

    it('Should not allow users to withdraw more than their balance', async function () {
        const initialBalance = await balanceTracker.connect(user1).getBalance();
        const withdrawAmount = initialBalance.add(ethers.utils.parseEther('1'));

        await expect(balanceTracker.connect(user2).withdraw(withdrawAmount)).to.be.revertedWith('Insufficient balance');
    });
});
