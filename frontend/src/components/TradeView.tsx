import React from "react";

type Props = TradeViewProps;

const TradeView: React.FC<Props> = ( { pair } ) => {


    return (
        <p>TradeView Page for {pair.main} / {pair.pairing}</p>
    )
}

export default TradeView;