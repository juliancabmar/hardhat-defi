const { ethers } = require("hardhat")
const { getNamedAccounts } = require("hardhat")

const { getWeth } = require("./helper-modules/getWeth")
const { getPool } = require("./helper-modules/getPool")
const { approvePool } = require("./helper-modules/approvePool")
const { getBorrowUserData } = require("./helper-modules/getUserData")
const { getDaiPrice } = require("./helper-modules/getDaiPrice")

async function main() {
    const { deployer } = await getNamedAccounts()
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    const AMOUNT = ethers.utils.parseEther("0.02")

    // Getting WETH from ETH
    await getWeth(wethTokenAddress, deployer, AMOUNT)

    //  Get the Pool address
    const pool = await getPool(deployer)
    console.log(`Pool address (${pool.address}) getted.`)

    // Approve Pool to pull my WETHs
    await approvePool(wethTokenAddress, pool.address, AMOUNT, deployer)
    console.log(`The Pool (${pool.address}) is now approved for use my WETHs`)

    // Make the Pool PULL my WETHs into it
    const tx = await pool.supply(wethTokenAddress, AMOUNT, deployer, 0)
    await tx.wait(1)
    console.log(`main: ${ethers.utils.formatEther(AMOUNT)} WETHs was depositated into the Pool`)

    //Get user data: total lended, total available to borrow
    // let { totalDebtETH, availableBorrowsETH } = await getBorrowUserData(lendingPool, deployer)

    // //Get DAI price
    // const daiPrice = await getDaiPrice()

    // // Calculate how many DAI I can lend based on the total available to borrow ETH using the DAI price
    // const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    // console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)
    // const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
    // console.log(`You can borrow ${amountDaiToBorrowWei} WEI of DAI`)
    // await borrowDai(networkConfig[network.config.chainId].daiToken, lendingPool, amountDaiToBorrowWei, deployer)
    // await getBorrowUserData(lendingPool, deployer)
    // await repay(amountDaiToBorrowWei, networkConfig[network.config.chainId].daiToken, lendingPool, deployer)
    // await getBorrowUserData(lendingPool, deployer)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
