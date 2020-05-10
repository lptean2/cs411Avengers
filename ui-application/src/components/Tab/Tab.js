import React, {useCallback} from 'react';
import {Tab as TabOptions} from '../../state/app/Tab';
import {setTab} from '../../state/app/actions';
import {removeSeriesData} from '../../state/app/actions';
import styles from './Tab.module.css';
import {useDispatch} from "react-redux";

const Tab = props => {
  const dispatch = useDispatch();

  const onClickView = useCallback((e) => {
    dispatch(removeSeriesData());
    dispatch(setTab(TabOptions.EXPLORER));
    document.getElementById("EDIT").className=styles.button;
    e.target.className=styles.selectedButton;
  }, [dispatch]);

  const onClickEdit = useCallback((e) => {
    dispatch(removeSeriesData());
    dispatch(setTab(TabOptions.EDIT));
    document.getElementById("EXPLORER").className=styles.button;
    e.target.className=styles.selectedButton;
  }, [dispatch]);

  return (
    <div className={styles.nav}>
    <span className={styles.title}>CPI Explorer</span>
      <button id="EXPLORER" className={styles.selectedButton} onClick={onClickView}>
        Explorer
      </button>
      <button id="EDIT" className={styles.button} onClick={onClickEdit}>
        Edit
      </button>
    </div>
  )
};

export default Tab;