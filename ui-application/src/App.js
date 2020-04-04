import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import BasketCreator from "./components/BasketCreator";
import ItemSelector from "./components/ItemSelector";
import BasketsChart from "./components/BasketsChart";
import ItemsBasket from "./components/ItemsBasket";
import styles from './App.module.css';

function App() {
    return (
        <Provider store={store}>
            <div className={styles.root}>
              <h1 className={styles.title}>CPI Explorer</h1>
              <div className={styles.creator}>
                <BasketCreator/>
              </div>
              <div className={styles.content}>
                <div className={styles.side}>
                  <ItemSelector />
                </div>
                <div className={styles.middle}>
                  <BasketsChart />
                </div>
                <div className={styles.side}>
                  <ItemsBasket />
                </div>
              </div>
            </div>
        </Provider>
    );
}

export default App;