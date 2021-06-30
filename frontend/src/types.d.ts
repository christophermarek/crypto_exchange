interface HomeProps{

}

interface MarketProps{
    balances: balances
    setBalances: React.Dispatch<React.SetStateAction<balances>>
    usersOrders: order[]
    setUsersOrders: React.Dispatch<React.SetStateAction<order[]>>
}

interface BalanceProps{
    balances: balances
    setBalances: React.Dispatch<React.SetStateAction<balances>>
}

interface OrdersProps{
    usersOrders: order[]
}


interface TradeViewProps{
    pair: tradePair
    balances: balances
    setBalances: React.Dispatch<React.SetStateAction<balances>>
    usersOrders: order[]
    setUsersOrders: React.Dispatch<React.SetStateAction<order[]>>
}

interface TradeViewTests{
    updateBalance?: (ticker: number, amount: number) => number
}

interface tradePair{
    main: string
    pairing: string
}


interface order{
    price: string
    units: string
    direction: string
    total: string
    status: string
}

interface balances{
    USDT: string
    BTC: string
    ETH: string
    VET: string
}