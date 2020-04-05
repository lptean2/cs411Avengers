import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";
import {setBaskets} from '../../state/app/actions';
import {requestBasket} from "../../state/data/actions";
import {Tab as TabOptions} from "../../state/app/Tab";

const BasketSelector = props => {
  const allBaskets = useSelector(state => state.data.allBaskets);
  const dispatch = useDispatch();

  const handleSelect = (selectedList, selectedBasket) => {
    console.log(selectedList);
    console.log(selectedBasket);
    dispatch(setBaskets(selectedList.map(obj => {
      return obj.ID
    })));
    console.log('selectedBasket', selectedBasket);
    dispatch(requestBasket(selectedBasket.ID));
  };

  const tab = useSelector(state => state.app.tab);

  return (
    <div>
      <h3>Available Baskets</h3>
      <Multiselect
        options={allBaskets}
        displayValue="Name"
        id="ID"
        singleSelect={tab===TabOptions.EDIT}
        onSelect={handleSelect}
      />
    </div>
  )
};

export default BasketSelector;