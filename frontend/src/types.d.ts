interface HomeProps{

}

interface MarketProps{

}

interface BalanceProps{
    balances: balances
    setBalances: React.Dispatch<React.SetStateAction<balances>>
}

interface TradeViewProps{
    pair: tradePair
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
}

interface balances{
    USDT: string
    BTC: string
    ETH: string
    VET: string
}


