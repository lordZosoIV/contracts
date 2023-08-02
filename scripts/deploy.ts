const { ethers } = require('hardhat');

async function main() {
  const VotingApp = await ethers.getContractFactory('VotingApp');
  const votingApp = await VotingApp.deploy();

  await votingApp.deployed();

  console.log('VotingApp deployed to:', votingApp.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
