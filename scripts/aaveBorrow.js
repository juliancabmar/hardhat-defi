const { ethers } = require("hardhat")
const { getNamedAccounts } = require("hardhat")

const { getWeth } = require("../scripts/getWeth")
const { getLendingPool } = require("../scripts/getLendingPool")
const { approveWeths } = require("./approveWeths")

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
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
