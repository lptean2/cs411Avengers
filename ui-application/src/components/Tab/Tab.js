import React, {useCallback} from 'react';
import {Tab as TabOptions} from '../../state/app/Tab';
import {setTab} from '../../state/app/actions';
import styles from './Tab.module.css';
import {useDispatch} from "react-redux";

const Tab = props => {
  const dispatch = useDispatch();

  const onClickView = useCallback((e) => {
    dispatch(setTab(TabOptions.EXPLORER));
    document.getElementById("EDIT").className=styles.button;
    console.log(e.target);
    e.target.className=styles.selectedButton;
  }, [dispatch]);

  const onClickEdit = useCallback((e) => {
    dispatch(setTab(TabOptions.EDIT));
    document.getElementById("EXPLORER").className=styles.button;
    e.target.className=styles.selectedButton;
    console.log(e.target);
  }, [dispatch]); 

  return (
    <div className={styles.root}>
      <button id="EXPLORER" className={styles.selectedButton} onClick={onClickView}>
        Explorer
      </button>
      <button id="EDIT" className={styles.button} onClick={onClickEdit}>
        Edit
      </button>
        <p className={styles.title}>CPI Explorer</p>
    </div>
  )
};

export default Tab;