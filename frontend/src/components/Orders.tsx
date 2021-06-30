import React, { useState } from "react";


type Props = OrdersProps;

const Orders: React.FC<Props> = ({ usersOrders }) => {

    return (
        <>
            <p>Orders</p>
            <ul>
                {usersOrders.map((order, index) =>
                    <li key={index}>
                        {order.direction} at {order.price} for {order.units} units. Total: {order.total} Status: {order.status}
                    </li>
                )}
            </ul>
        </>
    )
}

export default Orders;