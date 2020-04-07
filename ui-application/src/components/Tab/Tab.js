import React, {useCallback} from 'react';
import {Tab as TabOptions} from '../../state/app/Tab';
import {setTab} from '../../state/app/actions';
import styles from './Tab.module.css';
import {useDispatch} from "react-redux";

const Tab = props => {
  const dispatch = useDispatch();

  const onClickView = useCallback(() => {
    dispatch(setTab(TabOptions.DISPLAY));
  }, [dispatch]);

  const onClickEdit = useCallback(() => {
    dispatch(setTab(TabOptions.EDIT));
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={onClickView}>
        Explorer
      </button>
      <button className={styles.button} onClick={onClickEdit}>
        Edit
      </button>
    </div>
  )
};

export default Tab;