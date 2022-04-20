import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';

import axios from 'axios';

const Order = () => {

    const [order, setOrder] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('https://625a7f3fcda73d132d1faf62.mockapi.io/order')
            setOrder(data.flatMap(item => item.sneakers))
        })()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {
                    order.map((item) => 
                    <Card 
                        key={item.id}
                        {...item}/>)
                }
            </div>
        </div>
    );
};

export default Order;