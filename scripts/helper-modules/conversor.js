const { ethers } = require("hardhat")

function ethToWei(value) {
    return ethers.utils.parseEther(value)
}

function weiToEth(value) {
    return ethers.utils.formatEther(value)
}

module.exports = { ethToWei, weiToEth }
