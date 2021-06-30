import React, { useState } from "react";

import TradeView from './TradeView';

type Props = MarketProps;

const Markets: React.FC<Props> = ( { balances, setBalances, usersOrders, setUsersOrders } ) => {

    const [isTradeView, setIsTradeView] = useState<boolean>(false);
    const [tradeViewPair, setTradeViewPair] = useState<tradePair>({main:'USDT', pairing:'BTC'});

    const usdt_tradingPairs = [
        'BTC',
        'ETH',
        'VET'
    ];

    const renderTradingPairs = usdt_tradingPairs.map((element, index) =>
        <li>
            <p>USDT/{element}</p>
            <input type='button' value='trade' onClick={() => { setIsTradeView(true); setTradeViewPair({ main: 'USDT', pairing: element }) }} />
        </li>
    )

    return (
        <>
            {!isTradeView ?
                (
                    <>
                        <p>Markets Page</p>
                        <p>USDT Trading Pairs</p>
                        <ul>
                            {renderTradingPairs}
                        </ul>
                    </>
                )
                :
                (
                    <div className={'tradeView'}>
                        <input type='button' value='Back' onClick={() => setIsTradeView(false)} />
                        <TradeView pair={tradeViewPair} balances={balances} setBalances={setBalances} usersOrders={usersOrders} setUsersOrders={setUsersOrders}/>
                    </div>
                )
            }

        </>
    )
}

export default Markets;