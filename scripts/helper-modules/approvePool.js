const { ethers } = require("hardhat")

const { weiToEth } = require("./conversor")

async function approvePool(wethTokenAddress, spenderAddress, amountToSpend, account) {
    const wethToken = await ethers.getContractAt("IERC20", wethTokenAddress, account)
    const tx = await wethToken.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log(`approvePool: The Pool(${spenderAddress}) is now approved.`)
}

module.exports = { approvePool }
