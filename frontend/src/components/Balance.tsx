import React, { useState } from "react";

type Props = BalanceProps;

const Balance: React.FC<Props> = () => {

    const defaultBalances = {
        USDT: '0.00',
        BTC: '0.00',
        ETH: '0.00',
        VET: '0.00'
    };

    const [balances, setBalances] = useState<balances>(defaultBalances)

    const displayBalances = () => {

    }

    const depositCoins = (coinName: string) => {
        let amount = prompt("Enter coins to deposit", "0");
    
        if (amount != null) {
            //test for number and stuff after.
            setBalances({...balances, [coinName]: amount});
        }
    }

    return (
        <>
            <p>Balance Page</p>
            <p>Balances</p>
            <table>
                <tr>
                    <th>Coin</th>
                    <th>Balance</th>
                    <th>Deposit</th>
                </tr>
                    {Object.entries(balances).map(([key, value]) => {
                        return (
                            <tr>
                            <td>{key}</td>
                            <td>{value}</td>
                            <td><input type='button' value='deposit' onClick={() => depositCoins(key)}/></td>
                            </tr>
                        )
                    })}

            </table>

        </>
    )
}

export default Balance;