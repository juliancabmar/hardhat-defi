const { ethers } = require("hardhat")
const { getNamedAccounts } = require("hardhat")

const { getWeth } = require("./helper-modules/getWeth")
const { getLendingPool } = require("./helper-modules/getLendingPool")
const { approveWeths } = require("./helper-modules/approveWeths")
const { getBorrowUserData } = require("./helper-modules/getUserData")
const { getDaiPrice } = require("./helper-modules/getDaiPrice")

async function main() {
    const { deployer } = await getNamedAccounts()
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    const AMOUNT = ethers.utils.parseEther("0.02")

    // Getting WETH from ETH
    await getWeth(wethTokenAddress, deployer, AMOUNT)

    // Get the Lending Pool address
    const lendingPool = await getLendingPool(deployer)
    console.log(`main: Lending Pool Address getted: ${lendingPool.address}`)

    // Approve lending pool to pull my WETHs
    await approveWeths(wethTokenAddress, lendingPool.address, AMOUNT, deployer)

    // Make the lending pool PULL my WETHs into it
    const tx = await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    await tx.wait(1)
    console.log(`main: ${AMOUNT.toString()} was WETH depositated into the lending pool`)

    // Getting your borrowing stats

    //Get user data: total lended, total available to borrow
    let { totalDebtETH, availableBorrowsETH } = await getBorrowUserData(lendingPool, deployer)

    //Get DAI price
    const daiPrice = await getDaiPrice()

    // Calculate how many DAI I can lend based on the total available to borrow ETH using the DAI price
    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
    console.log(`You can borrow ${amountDaiToBorrowWei} WEI of DAI`)
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
