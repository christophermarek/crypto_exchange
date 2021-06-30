import { mainModule } from "process";
import React, { useState } from "react";
import axios from 'axios';

type Props = TradeViewProps & TradeViewTests;

const TradeView: React.FC<Props> = ({ pair, balances, setBalances, usersOrders, setUsersOrders }) => {

    //need to pull order book from server eventually
    const [buyOrderBook, setBuyOrderBook] = useState<Array<order>>([]);
    const [sellOrderBook, setSellOrderBook] = useState<Array<order>>([]);

    const [isBuyOrder, setIsBuyOrder] = useState<boolean>(true);


    //orderState
    const [units, setUnits] = useState<string>('');
    const [price, setPrice] = useState<string>('');


    const renderOrderBook = (orderBook: Array<order>) => {
        return (
            orderBook.map((order, index) =>
                <li key={index}>
                    {order.direction} {pair.pairing} at {order.price} for {order.units} units. Total: {order.total}
                </li>
            )
        )
    }

    /*
    const checkForOrdersToExecute = () => {
        //passed validation, 
        //go through each order book and check if an order can be fufilled
        //if it can then update balances to either add units on buy
        //or add usdt on sell fufilled.
        //update users order to fufilled.

        let buyOrdersLen = buyOrderBook.length;
        for (let i = 0; i < buyOrdersLen; i++) {

        }
        let sellOrdersLen = sellOrderBook.length;
        for (let i = 0; i < buyOrdersLen; i++) {

        }
    }
    */

    const sendOrderToServer = async (order: order) => {
        try {
            //const response = await axios.post('http://localhost:4000/', JSON.stringify(order));

            const response = await axios.get('http://localhost:4000/');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const sendOrder = (direction: string) => {
        const total = String(Number(units) * Number(price));

        const order: order = {
            total: total,
            units: units,
            price: price,
            status: 'pending',
            direction: direction
        }

        if (direction === 'buy') {
            //order validation
            let currBalance = balances['USDT'];
            if (Number(total) <= Number(currBalance)) {
                let updatedBalance = Number(currBalance) - Number(total);
                setBalances({ ...balances, [pair.main]: String(updatedBalance) });
                setBuyOrderBook(buyOrderBook => [...buyOrderBook, order]);
                setUsersOrders(usersOrders => [...usersOrders, order])
                sendOrderToServer(order);
            } else {
                alert('insufficient funds to make order')
            }
        }
        if (direction === 'sell') {
            let currBalance = getBalance(pair.pairing);
            if (Number(units) <= Number(currBalance)) {
                let updatedBalance = Number(currBalance) - Number(units);
                setBalances({ ...balances, [pair.pairing]: String(updatedBalance) });
                setSellOrderBook(sellOrderBook => [...sellOrderBook, order]);
                setUsersOrders(usersOrders => [...usersOrders, order])
                sendOrderToServer(order);
            } else {
                alert('insufficient funds to make order')
            }
        }

    }

    const getBalance = (ticker: string) => {
        switch (ticker) {
            case 'BTC':
                return balances['BTC'];
            case 'ETH':
                return balances['ETH'];
            case 'VET':
                return balances['VET'];
        }
    }

    const renderBalance = () => {

        return (
            <p>{pair.pairing} balance: {getBalance(pair.pairing)}</p>
        )

    }

    return (
        <>
            <p>TradeView Page for {pair.main} / {pair.pairing}</p>

            <div className='buyOrders'>
                {buyOrderBook.length > 0 ?
                    (
                        <>
                            <p>Buy Orders</p>
                            {renderOrderBook(buyOrderBook)}
                        </>
                    )
                    :
                    (
                        <p>No Buy Orders</p>
                    )
                }
            </div>
            <div className='sellOrders'>
                {sellOrderBook.length > 0 ?
                    (
                        <>
                            <p>Sell Orders</p>
                            {renderOrderBook(sellOrderBook)}
                        </>
                    )
                    :
                    (
                        <p>No Sell Orders</p>
                    )
                }
            </div>

            <div className='orderForm'>
                <input type='button' value={`Change to ${isBuyOrder ? 'Sell' : 'Buy'}`} onClick={() => setIsBuyOrder(!isBuyOrder)} />
                <p>{isBuyOrder ? 'Buy' : 'Sell'} {pair.pairing}</p>
                {isBuyOrder ?
                    (
                        <p>{pair.main} balance: {balances.USDT}</p>
                    )
                    :
                    (
                        renderBalance()
                    )
                }
                <div>
                    <p>Units</p>
                    <input type='text' value={units} onChange={(e) => setUnits(e.target.value)} />
                </div>
                <div>
                    <p>Price</p>
                    <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <input type='button' value='Send Order' onClick={() => sendOrder(isBuyOrder ? 'buy' : 'sell')} />
            </div>
        </>
    )
}
export default TradeView;