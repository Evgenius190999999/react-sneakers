import React, { useContext, useState } from 'react';
import axios from 'axios';

import Info from "./Info";
import { AppContext } from '../App';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

function Drawer({ onClose, cartItems = [], onRemove, }) {
  const [orderId, setOrderId] = useState(null);
  const { setCartItems, grandTotal } = useContext(AppContext);
  const [isOrder, setIsOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://625a7f3fcda73d132d1faf62.mockapi.io/order', {
        sneakers: cartItems
      });
      setOrderId(data.id);
      setIsOrder(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://625a7f3fcda73d132d1faf62.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };


  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {cartItems.length > 0 ? (
          <div className="cartView">
            <div className="items">
              {cartItems.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imgUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{grandTotal()} руб.
                  </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.floor(grandTotal() * 0.05)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrder ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={isOrder ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
            image={isOrder ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'} />
        )}
      </div>
    </div>
  );
}

export default Drawer;
