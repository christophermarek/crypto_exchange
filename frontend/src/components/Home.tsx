import React, { useState } from "react";
import Balance from './Balance';
import Markets from './Markets';

type Props = HomeProps;

const Home: React.FC<Props> = () => {
    const defaultBalances = {
        USDT: '0.00',
        BTC: '0.00',
        ETH: '0.00',
        VET: '0.00'
    };
    
    const [pageSelected, setPageSelected] = useState<string>('markets');
    const [balances, setBalances] = useState<balances>(defaultBalances);

    return (
        <>
            <p>Home Page</p>
            <input type='button' value='Balances' onClick={() => setPageSelected('balance')} />
            <input type='button' value='Markets' onClick={() => setPageSelected('markets')} />

            {pageSelected === 'balance' &&
                <Balance balances={balances} setBalances={setBalances}/>
            }
            {pageSelected === 'markets' &&
                <Markets balances={balances} setBalances={setBalances}/>
            }
        </>
    )
}

export default Home;