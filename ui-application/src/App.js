import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import BasketCreator from "./components/BasketCreator";
import ItemSelector from "./components/ItemSelector";
import BasketsChart from "./components/BasketsChart";
import ItemsBasket from "./components/ItemsBasket";
import {requestAllItems, requestAllBaskets} from "./state/data/actions";
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAllItems());
  });

  useEffect(() => {
    dispatch(requestAllBaskets());
  })
  return (
      <div className={styles.root}>
        <h1 className={styles.title}>CPI Explorer</h1>
        <div className={styles.creator}>
          <BasketCreator/>
        </div>
        <div className={styles.content}>
          <div className={styles.side}>
            <ItemSelector/>
          </div>
          <div className={styles.middle}>
            <BasketsChart/>
          </div>
          <div className={styles.side}>
            <ItemsBasket/>
          </div>
        </div>
      </div>
  );
}

export default App;