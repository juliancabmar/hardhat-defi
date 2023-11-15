const { ethers } = require("hardhat")

const { weiToEth } = require("./conversor")

async function approvePool(wethTokenAddress, spenderAddress, amountToSpend, account) {
    const wethToken = await ethers.getContractAt("IWeth", wethTokenAddress, account)
    const tx = await wethToken.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log(
        `approveWeths: The Pool(${spenderAddress}) is now approved for use ${weiToEth(amountToSpend)} of my WETHs.`
    )
}

module.exports = { approvePool }
