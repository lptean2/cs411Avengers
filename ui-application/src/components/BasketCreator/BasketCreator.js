import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";
import {requestAllBaskets} from "../../state/data/actions";


const BasketCreator = props => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const selectedItemIds = useSelector(state => state.app.selectedItemIds);
  
  const allBaskets = useSelector(state => state.data.allBaskets);

  const handleSubmit = (e) => {
    e.preventDefault();
    const basketItems = selectedItemIds.map(itemId => {
      return {ID: itemId, Quantity: 1}
    });

    fetch(
      'http://avengers1.web.illinois.edu/cpi_api/basket',
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            Name: name,
            Items: basketItems
          }
        )
      })
      .then(res => res.json())
      .then(data => {
        dispatch(requestAllBaskets())
      });
  };

  const handleSelect = (selectedList, selectedBasket) => {
    console.log(selectedList);
    console.log(selectedBasket);
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }


  return (
    <div>
      <h3>Available Baskets</h3>
      <Multiselect
        options={allBaskets}
        displayValue="Name"
        onSelect={handleSelect}
      />
      <h3>Create new Basket:</h3>
      <form onSubmit={handleSubmit}>
        <label>Basket Name: </label>
        <input
          type="text"
          value={name}
          onChange={handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
};

export default BasketCreator;