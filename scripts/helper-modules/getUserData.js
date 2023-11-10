async function getBorrowUserData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } = await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH deposited.`)
    // tienes 20 ETH depositados.
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`)
    // Tienes 0 ETH prestados.
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`)
    // Puedes pedir prestado ETH por valor de 16.
    return { totalDebtETH, availableBorrowsETH }
}

module.exports = { getBorrowUserData }
