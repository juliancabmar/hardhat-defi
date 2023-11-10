const { ethers } = require("hardhat")

async function approveWeths(wethTokenAddress, spenderAddress, amountToSpend, account) {
    const wethToken = await ethers.getContractAt("IWeth", wethTokenAddress, account)
    const tx = await wethToken.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log(`approveWeths: ${spenderAddress} is now approved for use ${amountToSpend} of my WETHs.`)
}

module.exports = { approveWeths }
