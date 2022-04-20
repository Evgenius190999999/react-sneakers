import React from 'react';
import Card from '../components/Card/Card';

const Home = ({searchValue,
    setSearchValue,
    onChangeSearchInput,
    sneakers,
    onAddToCart,
    onAddToFavorite,
    isLoaded}) => {

    const renderItems = () => {
        const filtredItems = sneakers.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoaded ? [...Array(10)] : filtredItems).map((item, index) => (
          <Card
            key={index}
            onClickPlus={(obj) => onAddToCart(obj)}
            onClickFavorite={(obj) => onAddToFavorite(obj)}
            loading={isLoaded}
            {...item}
          />
        ));
      };

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="cu-p clear" src="/img/btn-remove.svg" alt="Clear" />}
                    <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
};

export default Home;