const { network } = require("hardhat")
const { ethers } = require("hardhat")

const { networkConfig } = require("../../helper-hardhat-config")

async function getDaiPrice() {
    const daiUsdPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        networkConfig[network.config.chainId].daiUsdPriceFeed
    )
    const daiPrice = (await daiUsdPriceFeed.latestRoundData())[1]
    const daiDecimals = await daiUsdPriceFeed.decimals()
    console.log(`getDaiPrice(): The DAI/USD price is ${daiPrice.toString()} using ${daiDecimals} decimals`)
    return { daiPrice, daiDecimals }
}

module.exports = { getDaiPrice }
