import React from 'react';
import {useSelector} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";

const BasketSelector = props => {
  const allBaskets = useSelector(state => state.data.allBaskets);
  const handleSelect = (selectedList, selectedBasket) => {
    console.log(selectedList);
    console.log(selectedBasket);
  };
  return (
    <div>
      <h3>Available Baskets</h3>
      <Multiselect
        options={allBaskets}
        displayValue="Name"
        id="ID"
        onSelect={handleSelect}
      />
    </div>
  )
};

export default BasketSelector;