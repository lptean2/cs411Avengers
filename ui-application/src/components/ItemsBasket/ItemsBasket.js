import React from 'react';
import {useSelector} from "react-redux";
import styles from './ItemsBasket.module.css';

const ItemsBasket = props => {
  const basketItems = useSelector(state => state.app.basketItems);
  const allBaskets = useSelector(state => state.data.allBaskets);
  return (
    <div className={styles.root}>
      {Object.entries(basketItems).map(([basketId, items]) => {
        const basket = allBaskets.find(({ID}) => ID === Number(basketId));
        return (
          <div className={styles.basket} key={basketId}>
            <div className={styles.basketName}>{basket.Name}</div>
            <div className={styles.qtyHeader}>Qty</div>
            {items.map(item => (
              <React.Fragment key={`${basket.ID}-${item.ItemID}`}>
                <div className={styles.name}>{item.Name}</div>
                <div className={styles.qty}>{item.Quantity}</div>
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  )
};

export default ItemsBasket;