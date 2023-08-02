pragma solidity ^0.8.0;

contract Task1_1 {

    function sumEvenNumbers(int[] memory numbers) public pure returns (int) {
        int sum = 0;
        for (uint256 i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                sum += numbers[i];
            }
        }
        return sum;
    }

}