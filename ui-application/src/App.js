import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BasketCreator from "./components/BasketCreator";
import BasketSelector from "./components/BasketSelector";
import ItemSelector from "./components/ItemSelector";
import BasketsChart from "./components/BasketsChart";
import ItemsBasket from "./components/ItemsBasket";
import Tab from "./components/Tab";
import {Tab as TabOptions} from "./state/app/Tab";
import {requestAllItems, requestAllBaskets} from "./state/data/actions";
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAllItems());
  },[dispatch]);

  useEffect(() => {
    dispatch(requestAllBaskets());
  },[dispatch]);

  const tab = useSelector((state) => {
    return state.app.tab;
  });

  return (
      <div className={styles.root}>
        <Tab/>
        {tab === TabOptions.DISPLAY && (
            <>
            <h1 className={styles.title}>CPI Explorer</h1>
            <div className={styles.creator}>
              <BasketSelector/>
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
            </>
        )}
        {tab === TabOptions.EDIT && (
            <>
            <h1 className={styles.title}>CPI Explorer</h1>
            <div className={styles.creator}>
              <BasketCreator/>
            </div>
            <div className={styles.content}>
              <div className={styles.side}>
                <ItemSelector/>
              </div>
              <div className={styles.side}>
                <ItemsBasket/>
              </div>
            </div>
            </>
        )}
        
      </div>
  );
}

export default App;