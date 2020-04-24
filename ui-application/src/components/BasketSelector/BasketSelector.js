import React, {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";
import {setSelectedBasketIds, removeBasketItems} from '../../state/app/actions';
import {requestBasket} from "../../state/data/actions";
import {Tab as TabOptions} from "../../state/app/Tab";
import styles from "./BasketSelector.module.css";

const BasketSelector = props => {
  const allBaskets = useSelector(state => state.data.allBaskets);
  const selectedBasketIds = useSelector(state => state.app.selectedBasketIds);
  const selectedBasketObjects = useMemo(() => {
    return selectedBasketIds.map(basketId => allBaskets.find(b => b.ID === basketId));
  }, [allBaskets, selectedBasketIds]);

  const dispatch = useDispatch();
  const tab = useSelector(state => state.app.tab);

  const handleSelect = (selectedList, selectedBasket) => {
    dispatch(setSelectedBasketIds(selectedList.map(obj => {
      return obj.ID
    })));
    dispatch(requestBasket(selectedBasket.ID));
  };

  const handleRemove = (selectedList, removedBasket) => {
    dispatch(setSelectedBasketIds(selectedList.map(obj => {
      return obj.ID
    })));
    dispatch(removeBasketItems(removedBasket.ID));
  };

  return (
    <div>
      <div className={styles.label}>Available Baskets:</div>
      <Multiselect
        options={allBaskets}
        selectedValues={selectedBasketObjects}
        placeholder="Select Basket..."
        displayValue="Name"
        id="ID"
        singleSelect={tab===TabOptions.EDIT}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    </div>
  )
};

export default BasketSelector;