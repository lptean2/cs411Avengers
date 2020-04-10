import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestSaveBasket, requestDeleteBasket} from "../../state/data/actions";
import styles from './BasketCreator.module.css';
import BasketSelector from "../BasketSelector";


const BasketCreator = props => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const selectedEditItems = useSelector(state => state.edit.selectedEditItems);
  const selectedBasketId = useSelector(state => state.app.selectedBasketIds)?.[0];
  const allBaskets = useSelector(state => state.data.allBaskets);
  const selectedBasket = allBaskets.find(({ID}) => ID === selectedBasketId);

  const handleSaveAs = useCallback((e) => {
    e.preventDefault();
    dispatch(requestSaveBasket({items: selectedEditItems, basketName: name}));
  }, [selectedEditItems, name, dispatch]);

  const handleSave = useCallback((e) => {
    e.preventDefault();
    dispatch(requestSaveBasket({items: selectedEditItems, basketId: selectedBasket?.ID, basketName: selectedBasket?.Name}));
  }, [selectedEditItems, selectedBasket, dispatch]);

  const handleChange = useCallback((e) => setName(e.target.value), []);

  const handleDelete = useCallback((e) => {
    e.preventDefault();
    dispatch(requestDeleteBasket(selectedBasket?.ID))
  }, [dispatch, selectedBasket]);

  return (
    <div className={styles.root}>
      <div>
        <BasketSelector/>
      </div>
      <div>
        <button onClick={handleSave}>
          Save
        </button>
        <button onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className={styles.divider}/>
      <div>Create New Basket:</div>
      <input
        type="text"
        value={name}
        placeholder={"New basket name..."}
        onChange={handleChange}
      />
      <button onClick={handleSaveAs}>
        Save As
      </button>
    </div>
  )
};

export default BasketCreator;