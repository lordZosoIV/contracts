import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { expect } from 'chai';
describe('VotingApp', function () {
    let votingApp: Contract;
    let owner: Signer;
    let user1: Signer;
    let user2: Signer;

    before(async () => {
        const VotingApp = await ethers.getContractFactory('VotingApp');
        [owner, user1, user2] = await ethers.getSigners();

        votingApp = await VotingApp.deploy();
        await votingApp.deployed();
    });

    it('Should allow users to vote for candidates', async function () {
        await votingApp.connect(user1).vote(0);

        await votingApp.connect(user2).vote(1);

        const votesCandidate0 = await votingApp.getCandidateVotes(0);
        const votesCandidate1 = await votingApp.getCandidateVotes(1);

        expect(votesCandidate0).to.equal(1);
        expect(votesCandidate1).to.equal(1);
    });

    it('Should not allow users to vote again', async function () {
        await expect(votingApp.connect(user1).vote(0)).to.be.revertedWith('You have already voted.');
    });

    it('Should return correct vote counts', async function () {
        const votesCandidate0 = await votingApp.getCandidateVotes(0);
        const votesCandidate1 = await votingApp.getCandidateVotes(1);

        expect(votesCandidate0).to.equal(1);
        expect(votesCandidate1).to.equal(1);
    });
});
