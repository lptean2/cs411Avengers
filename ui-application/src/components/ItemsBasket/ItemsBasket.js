import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import styles from './ItemsBasket.module.css';

const ItemsBasket = props => {
  const basketItems = useSelector(state => state.app.basketItems);
  return (
    <div className={styles.root}>
      {Object.entries(basketItems).map(([basketId, basketItems]) => (
        <div key={basketId}>
          <div>Basket ID:<b>{basketId}</b></div>
          {basketItems.map(basketItem => (
            <div key={basketItem.ID}>Item: {JSON.stringify(basketItem)}</div>
          ))}
        </div>
      ))}
    </div>
  )
};

export default ItemsBasket;