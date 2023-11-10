const { ethers } = require("hardhat")

async function getWeth(wethTokenAddress, account, amount) {
    // call the "deposit" function on the weth contract
    // abi OK, contract address OK
    // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const iWeth = await ethers.getContractAt("IWeth", wethTokenAddress, account)

    const tx = await iWeth.deposit({ value: amount })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(account)
    console.log(`getWeth: ${account} Got Now ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth }
