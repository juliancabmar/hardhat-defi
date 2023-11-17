const { ethers } = require("hardhat")

async function getWeth(wethTokenAddress, account, amount) {
    const iWeth = await ethers.getContractAt("IWeth", wethTokenAddress, account)

    const tx = await iWeth.deposit({ value: amount })
    console.log("PASO")
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(account)
    console.log(`getWeth: ${account} Got Now ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth }
