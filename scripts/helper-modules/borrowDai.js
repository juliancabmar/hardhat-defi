const { networkConfig } = require("../../helper-hardhat-config")

async function borrowDai(pool, amountDaiToBorrow, account) {
    const daiAddress = networkConfig[network.config.chainId].daiToken
    const borrowTx = await pool.borrow(daiAddress, amountDaiToBorrow, 2, 0, account)
    await borrowTx.wait(1)
    console.log("You've borrowed")
}

module.exports = { borrowDai }
