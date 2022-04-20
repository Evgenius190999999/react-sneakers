import { Route } from "react-router-dom";

import { useEffect, useState, createContext } from 'react';
import axios from 'axios';


import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from "./pages/Home";
import Favorites from './pages/Favorites';
import Order from './pages/Order';

export const AppContext = createContext({});

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sneakers, setSneakers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cart = await axios.get('https://625a7f3fcda73d132d1faf62.mockapi.io/cart');
      const favorites = await axios.get('https://625a7f3fcda73d132d1faf62.mockapi.io/favorites');
      const items = await axios.get('https://625a7f3fcda73d132d1faf62.mockapi.io/items');

      setIsLoaded(false);

      setCartItems(cart.data);
      setFavorites(favorites.data);
      setSneakers(items.data);
    }

    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
    if (findItem) {
      axios.delete(`https://625a7f3fcda73d132d1faf62.mockapi.io/cart/${findItem.id}`)
      setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
    } else {
      const { data } = await axios.post('https://625a7f3fcda73d132d1faf62.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, data]);
    }
  }

  const onAddToFavorite = async (obj) => {
    if (favorites.find(item => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://625a7f3fcda73d132d1faf62.mockapi.io/favorites/${obj.id}`)
      setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      const { data } = await axios.post('https://625a7f3fcda73d132d1faf62.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, data]);
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://625a7f3fcda73d132d1faf62.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => +item.id !== +id));
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const getAddedItems = (id) => {
    return cartItems.some(obj => +obj.parentId === +id)
  }

  const grandTotal = () => {
    return cartItems.reduce(
      (acc, currentValue) => acc + currentValue.price,
      0)
  }

  return (
    <AppContext.Provider value={{ cartItems, favorites, sneakers, getAddedItems, onAddToFavorite, setCartOpen, setCartItems, grandTotal }}>

      <div className="wrapper clear">
        {cartOpen && <Drawer cartItems={cartItems} onClose={() => setCartOpen(false)} onRemove={onRemoveItem} />}

        <Header grandTotal={grandTotal} onClickCart={() => setCartOpen(true)} />
        <Route exact path='/'>
          <Home
            searchValue={searchValue}
            cartItems={cartItems}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            sneakers={sneakers}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoaded={isLoaded}
          />
        </Route>
        <Route path='/favorites' >
          <Favorites />
        </Route>
        <Route path='/order' >
          <Order />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
