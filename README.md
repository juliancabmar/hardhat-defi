# Defi with hardhat and AaveV3

## Instructions for use

### Clone the repo:
```
$ git clone https://github.com/juliancabmar/hardhat-defi
```
### Install depencences:
```
$ yarn
```
or
```
$ npm i
```
### Run:
```
$ yarn hardhat run scripts/aaveBorrow.js 
```
or
```
$ npx hardhat run scripts/aaveBorrow.js 
```
### Program steps:

1. Getting WETH from ETH
2. Get the Pool address
3. Approve Pool to pull my WETHs
4. Make the Pool PULL my WETHs into it.
5. Get user data: total deposited, total lended, total available to borrow
6. Get DAI price
7. Calculate how many DAI I can borrow based on the total available to borrow USD using the DAI price
8. Convert the amount to borrow to WEI units
9. Borrow the DAIs
10. Refresh and show the new user AAVE balances
11. Approve Pool to pull my DAIs back
12. Repay the debt
13. Refresh and show the new user AAVE balances
