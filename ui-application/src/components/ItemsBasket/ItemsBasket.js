import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import styles from './ItemsBasket.module.css';

const ItemsBasket = props => {
  const selectedItemsIds = useSelector(state => state.app.selectedItemIds);
  const allItems = useSelector(state => state.data.allItems);
  const selectedItems = useMemo(() => {
    return selectedItemsIds.map(itemId => allItems.find(({ID}) => ID === itemId));
  }, [selectedItemsIds, allItems]);
  return (
    <div className={styles.root}>
      {selectedItems.map(({ID, Name}) => (
        <div>
          <span>{ID}</span> - <span>{Name}</span>
        </div>
      ))}
    </div>
  )
};

export default ItemsBasket;