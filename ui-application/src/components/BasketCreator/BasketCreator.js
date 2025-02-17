import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestDeleteBasket, requestSaveBasket} from "../../state/data/actions";
import styles from './BasketCreator.module.css';
import BasketSelector from "../BasketSelector";
import {setSelectedBasketIds} from "../../state/app/actions";


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
    dispatch(setSelectedBasketIds([]));
    dispatch(requestDeleteBasket(selectedBasket?.ID))
  }, [dispatch, selectedBasket]);

  return (
    <div className={styles.root}>
    <div className={styles.section}>
      <div>
        <BasketSelector height="20px"/>
      </div>
      <div>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
        <button className={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className={styles.divider}/>
    </div>
    <div className={styles.section}>
      <div className={styles.label}>Create New Basket:
      <br/>
      <input
        className={styles.input}
        type="text"
        value={name}
        placeholder={"New basket name..."}
        onChange={handleChange}
      /></div>
      
      <button className={styles.button} onClick={handleSaveAs}>
        Save As
      </button>
    </div>
    </div>
  )
};

export default BasketCreator;