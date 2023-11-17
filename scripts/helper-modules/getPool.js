const { ethers } = require("hardhat")

const { networkConfig } = require("../../helper-hardhat-config")

async function getPool(account) {
    const poolAddressProvider = await ethers.getContractAt(
        "IPoolAddressesProvider",
        networkConfig[network.config.chainId].poolAddressesProvider,
        account
    )
    const poolAddress = await poolAddressProvider.getPool()
    const pool = await ethers.getContractAt("IPool", poolAddress, account)

    return pool
}

module.exports = { getPool }
