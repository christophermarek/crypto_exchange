import React, { useState } from "react";
import Balance from './Balance';
import Markets from './Markets';
import Orders from './Orders';

type Props = HomeProps;

const Home: React.FC<Props> = () => {
    const defaultBalances = {
        USDT: '500.00',
        BTC: '50.00',
        ETH: '0.00',
        VET: '0.00'
    };
    
    const [pageSelected, setPageSelected] = useState<string>('markets');
    const [balances, setBalances] = useState<balances>(defaultBalances);
    const [usersOrders, setUsersOrders] = useState<Array<order>>([]);

    return (
        <>
            <p>Home Page</p>
            <input type='button' value='Balances' onClick={() => setPageSelected('balance')} />
            <input type='button' value='Markets' onClick={() => setPageSelected('markets')} />
            <input type='button' value='Orders' onClick={() => setPageSelected('orders')} />

            {pageSelected === 'balance' &&
                <Balance balances={balances} setBalances={setBalances}/>
            }
            {pageSelected === 'markets' &&
                <Markets balances={balances} setBalances={setBalances} usersOrders={usersOrders} setUsersOrders={setUsersOrders}/>
            }
            {pageSelected === 'orders' &&
                <Orders usersOrders={usersOrders}/>
            }
        </>
    )
}

export default Home;