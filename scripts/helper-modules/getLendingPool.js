const { ethers } = require("hardhat")

async function getLendingPool(account) {
    // abi, address

    // Lending Pool address provider: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5

    // Lending pool address: ?

    const lendingPoolAddressProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)

    return lendingPool
}

module.exports = { getLendingPool }
