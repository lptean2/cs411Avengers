import React, {useCallback} from 'react';
import {MdRemoveShoppingCart} from "react-icons/md";
import styles from './RemoveButton.module.css';
import {removeEditItem} from "../../../state/edit/actions";
import {useDispatch} from "react-redux";

const RemoveButton = props => {
  const dispatch = useDispatch();

  const {data} = props;

  const onClick = useCallback(() => {
    dispatch(removeEditItem(data.ItemID));
  }, [dispatch, data]);

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={onClick}>
        <MdRemoveShoppingCart size={16} color={"#eb8334"} />
      </button>
    </div>
  )
};

export default RemoveButton;