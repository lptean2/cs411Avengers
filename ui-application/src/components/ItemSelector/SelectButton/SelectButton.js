import React, {useCallback} from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import styles from './SelectButton.module.css';
import {addItem} from "../../../state/app/actions";
import {useDispatch} from "react-redux";

const SelectButton = props => {
  const dispatch = useDispatch();

  const {data} = props;

  const onClick = useCallback(() => {
    dispatch(addItem(data.ID));
  }, [dispatch, data]);

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={onClick}>
        <MdAddShoppingCart size={16} color={"#eb8334"} />
      </button>
    </div>
  )
};

export default SelectButton;