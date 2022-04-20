import {  Link } from "react-router-dom";

function Header({onClickCart, grandTotal}) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to='/'>
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="logo" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>{grandTotal()} руб.</span>
        </li>
        <Link to='/favorites' className="mr-10 cu-p" >
          <img width={18} height={18} src="/img/heart.svg" alt="heart" />
        </Link>
        <Link to='/order'>
          <img width={18} height={18} src="/img/user.svg" alt="user" />
        </Link>
      </ul>
    </header>
  );
}

export default Header;
