const networkConfig = {
    31337: {
        name: "localhost",
        poolAddressesProvider: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
        daiUsdPriceFeed: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        daiToken: "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    }
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains
}
