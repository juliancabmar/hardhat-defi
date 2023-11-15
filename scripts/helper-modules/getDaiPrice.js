const { ethers } = require("hardhat")

const { networkConfig } = require("../../helper-hardhat-config")

const decimals = 8

async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        networkConfig[network.config.chainId].daiEthPriceFeed
    )
    const price = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`getDaiPrice(): The DAI/ETH price is ${price.toString()}`)
    return price
}

module.exports = { getDaiPrice, decimals }
