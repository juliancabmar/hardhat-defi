async function getUserData(pool, account) {
    const { totalCollateralBase, totalDebtBase, availableBorrowsBase } = await pool.getUserAccountData(account)

    return { totalCollateralBase, totalDebtBase, availableBorrowsBase }
}

module.exports = { getUserData }
