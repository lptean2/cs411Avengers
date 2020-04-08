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
import {requestAllBaskets, requestAllItems} from "./state/data/actions";
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAllItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(requestAllBaskets());
  }, [dispatch]);

  const basketItems = useSelector(state => state.data.basketItems);
  const selectedRegionId = useSelector(state => state.app.selectedRegionId);
  useEffect(() => {
    if (basketItems && selectedRegionId) {
      const itemIDSet = new Set();
      Object.values(basketItems).forEach(basketItemObjects => {
        basketItemObjects.forEach(basketItemObject => {
          itemIDSet.add(basketItemObject.ItemID);
        });
      });

      //todo ask back end if we need to make individual calls for each itemId
      [...itemIDSet].forEach(itemId => {
        window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?ItemID=${itemId}&RegionID=${selectedRegionId}`)
          .then(priceSeries => {
            console.log("priceSeries data", priceSeries);
            //todo: push it to state, chart it
          });
      });
    }
  }, [basketItems, selectedRegionId]);


  const tab = useSelector((state) => {
    return state.app.tab;
  });

  const state = useSelector(state => state);

  console.log('state', state);
  return (
    <div className={styles.root}>
      <Tab/>
      {tab === TabOptions.DISPLAY && (
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
            <div className={styles.side}>
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