import React, { useState } from "react";
import Balance from './Balance';
import Markets from './Markets';

type Props = HomeProps;

const Home: React.FC<Props> = () => {

    const [pageSelected, setPageSelected] = useState<string>('markets');

    return (
        <>
            <p>Home Page</p>
            <input type='button' value='Balances' onClick={() => setPageSelected('balance')} />
            <input type='button' value='Markets' onClick={() => setPageSelected('markets')} />

            {pageSelected === 'balance' &&
                <Balance />
            }
            {pageSelected === 'markets' &&
                <Markets />
            }
        </>
    )
}

export default Home;