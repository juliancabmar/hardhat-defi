const { ethers } = require("hardhat")
const { getNamedAccounts } = require("hardhat")

const { networkConfig } = require("../helper-hardhat-config")
const { getWeth } = require("./helper-modules/getWeth")
const { getPool } = require("./helper-modules/getPool")
const { approvePool } = require("./helper-modules/approvePool")
const { getUserData } = require("./helper-modules/getUserData")
const { getDaiPrice } = require("./helper-modules/getDaiPrice")
const { borrowDai } = require("./helper-modules/borrowDai")

const AAVE_BASE_CURRENCY_DECIMALS = 8

async function main() {
    const { deployer } = await getNamedAccounts()
    const wethTokenAddress = networkConfig[network.config.chainId].wethToken
    const AMOUNT = ethers.utils.parseEther("0.02")

    const decimals = AAVE_BASE_CURRENCY_DECIMALS

    // Getting WETH from ETH
    await getWeth(wethTokenAddress, deployer, AMOUNT)

    // Get the Pool address
    const pool = await getPool(deployer)
    console.log(`Pool address (${pool.address}) getted.`)

    // Approve Pool to pull my WETHs
    await approvePool(wethTokenAddress, pool.address, AMOUNT, deployer)
    console.log(`The Pool (${pool.address}) is now approved for use my WETHs`)

    // Make the Pool PULL my WETHs into it
    const tx = await pool.supply(wethTokenAddress, AMOUNT, deployer, 0)
    await tx.wait(1)
    console.log(`main: ${ethers.utils.formatEther(AMOUNT)} WETHs was depositated into the Pool`)

    // Get user data: total deposited, total lended, total available to borrow
    let userData = await getUserData(pool, deployer)
    console.log(`You have ${userData.totalCollateralBase * 10 ** -decimals} USD deposited.`)
    console.log(`You have ${userData.totalDebtBase * 10 ** -decimals} USD borrowed.`)
    console.log(`You can borrow ${userData.availableBorrowsBase * 10 ** -decimals} USD.`)

    // Get DAI price
    const { daiPrice, daiDecimals } = await getDaiPrice()

    // Calculate how many DAI I can borrow based on the total available to borrow USD using the DAI price
    const amountDaiToBorrow = userData.availableBorrowsBase * 0.95 * (1 / daiPrice.toNumber())
    console.log(`The DAI amount we will borrow is ${amountDaiToBorrow.toString()} DAIs`)

    // Convert the amount to borrow to WEI units
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())

    // Borrow the DAIs
    await borrowDai(pool, amountDaiToBorrowWei, deployer)

    // Refresh and show the user data
    userData = await getUserData(pool, deployer)
    console.log(`You have ${userData.totalCollateralBase * 10 ** -decimals} USD deposited.`)
    console.log(`You have ${userData.totalDebtBase * 10 ** -decimals} USD borrowed.`)
    console.log(`You can borrow ${userData.availableBorrowsBase * 10 ** -decimals} USD.`)

    // Approve Pool to pull my DAIs back
    await approvePool(networkConfig[network.config.chainId].daiToken, pool.address, amountDaiToBorrowWei, deployer)
    console.log(`The Pool (${pool.address}) is now approved for use my ABIs`)

    // Repay the debt
    await pool.repay(networkConfig[network.config.chainId].daiToken, amountDaiToBorrowWei, 2, deployer)
    console.log(`Debt repayed.`)

    // Refresh and show the user data
    userData = await getUserData(pool, deployer)
    console.log(`You have ${userData.totalCollateralBase * 10 ** -decimals} USD deposited.`)
    console.log(`You have ${userData.totalDebtBase * 10 ** -decimals} USD borrowed.`)
    console.log(`You can borrow ${userData.availableBorrowsBase * 10 ** -decimals} USD.`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
