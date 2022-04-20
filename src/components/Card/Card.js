import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import style from './Card.module.scss';

import ContentLoader from "react-content-loader"

function Card({ name, price, onClickPlus, onClickFavorite, imgUrl, id, favorited = false, loading }) {

  const { getAddedItems } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const addToCard = () => {
    onClickPlus({ parentId: id, imgUrl, name, price, id });
  };

  const onClickFavorites = () => {
    onClickFavorite({ parentId: id, imgUrl, name, price, id })
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.card}>
      {loading ?
        <ContentLoader
          speed={2}
          width={155}
          height={260}
          viewBox="0 0 155 260"
          backgroundColor="#ffffff"
          foregroundColor="#857a7a"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="120" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="150" rx="5" ry="5" width="80" height="25" />
          <rect x="120" y="142" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> :
        <>
          {onClickFavorite && <div className={style.favorite} onClick={onClickFavorites}>
            <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="Unliked" />
          </div>}
          <img width={133} height={112} src={imgUrl} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onClickPlus && <img className={style.plus} onClick={addToCard} src={getAddedItems(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="Plus" />}
          </div>
        </>}
    </div>
  );
}

export default Card;