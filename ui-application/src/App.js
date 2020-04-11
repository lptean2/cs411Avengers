import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BasketCreator from "./components/BasketCreator";
import BasketSelector from "./components/BasketSelector";
import ItemSelector from "./components/ItemSelector";
import BasketsChart from "./components/BasketsChart";
import SelectedItems from "./components/SelectedItems";
import ItemsBasket from "./components/ItemsBasket";
import Tab from "./components/Tab";
import {Tab as TabOptions} from "./state/app/Tab";
import {ADD_SERIES_DATA, requestAllBaskets, requestAllItems} from "./state/data/actions";
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAllItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(requestAllBaskets());
  }, [dispatch]);

  const selectedBasketIds = useSelector(state => state.app.selectedBasketIds);
  const selectedRegionId = useSelector(state => state.app.selectedRegionId);
  useEffect(() => {
    if (selectedBasketIds?.length && selectedRegionId) {
      selectedBasketIds.forEach(basketId => {
        window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?BasketID=${basketId}&RegionID=${selectedRegionId}`)
          .then(res => res.json())
          .then(json => {
            dispatch({
              type: ADD_SERIES_DATA,
              basketId,
              seriesData: json,
            })
          });
      });
    }
  }, [selectedBasketIds, selectedRegionId, dispatch]);


  const tab = useSelector((state) => {
    return state.app.tab;
  });

  //todo: just for debuggin. delete before release
  const state = useSelector(state => state);
  console.log('state', state);
  return (
    <div className={styles.root}>
      <Tab/>
      {tab === TabOptions.EXPLORER && (
        <>
          <h1 className={styles.title}>CPI Explorer</h1>
          <div className={styles.selectors}>
            <div className={styles.selector}>
              <BasketSelector/>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.chart}>
              <BasketsChart/>
            </div>
            <div className={styles.itemsBasket}>
              <ItemsBasket/>
            </div>
          </div>
        </>
      )}
      {tab === TabOptions.EDIT && (
        <>
          <h1 className={styles.title}>CPI Explorer</h1>
          <div className={styles.creator}>
            <BasketCreator/>
          </div>
          <div className={styles.content}>
            <div className={styles.side}>
              <ItemSelector/>
            </div>
            <div className={styles.side}>
              <SelectedItems/>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default App;