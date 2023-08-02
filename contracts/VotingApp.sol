pragma solidity ^0.8.0;

contract VotingApp {
    mapping(uint256 => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;

    event Voted(uint256 indexed candidateId, address indexed voter);

    function vote(uint256 candidateId) external {
        require(!hasVoted[msg.sender], "You have already voted.");

        votesReceived[candidateId]++;
        hasVoted[msg.sender] = true;

        emit Voted(candidateId, msg.sender);
    }

    function getCandidateVotes(uint256 candidateId) external view returns (uint256) {
        return votesReceived[candidateId];
    }
}
