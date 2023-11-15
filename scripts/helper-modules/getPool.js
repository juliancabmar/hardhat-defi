const { ethers } = require("hardhat")

async function getPool(account) {
    const poolAddressProvider = await ethers.getContractAt(
        "IPoolAddressesProvider",
        "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
        account
    )
    const poolAddress = await poolAddressProvider.getPool()
    const pool = await ethers.getContractAt("IPool", poolAddress, account)

    return pool
}

module.exports = { getPool }
