import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";
import {setBaskets} from '../../state/app/actions';
import {requestBasket} from "../../state/data/actions";
import {Tab as TabOptions} from "../../state/app/Tab";
import styles from "./BasketSelector.module.css";

const BasketSelector = props => {
  const allBaskets = useSelector(state => state.data.allBaskets);
  const dispatch = useDispatch();
  const tab = useSelector(state => state.app.tab);


  const handleSelect = (selectedList, selectedBasket) => {
    console.log(selectedList);
    console.log(selectedBasket);
    dispatch(setBaskets(selectedList.map(obj => {
      return obj.ID
    })));
    dispatch(requestBasket(selectedBasket.ID));
  };


  return (
    <div>
      <div className={styles.label}>Available Baskets:</div>
      <Multiselect
        options={allBaskets}
        placeholder="Select Basket..."
        displayValue="Name"
        id="ID"
        singleSelect={tab===TabOptions.EDIT}
        onSelect={handleSelect}
      />
    </div>
  )
};

export default BasketSelector;