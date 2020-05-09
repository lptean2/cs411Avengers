import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {displayBasketBreakout,removeSeriesData} from '../../state/app/actions';
import {requestSeriesData} from "../../state/data/actions";
import styles from "./BasketBreakoutToggle.module.css";



const BasketBreakoutToggle = props => {
  const dispatch = useDispatch();
  const selectedBasketIds = useSelector(state => state.app.selectedBasketIds);
  const selectedRegionId = useSelector(state => state.app.selectedRegionId);
  const isChecked = useSelector(state => state.app.displayBasketBreakout);
  const basketBreakoutToggle = useSelector(state => state.displayBasketBreakout);
  const selectedBasketItems = useSelector(state => state.app.basketItems);
  const label = "Display Series by Item";

  const handleChange = useCallback((e) => {
    dispatch(displayBasketBreakout());

    dispatch(removeSeriesData());
    //todo remove current series data

    dispatch(requestSeriesData());
    //todo query series data again

  }, [isChecked, dispatch]);
  return(
    <div>
      <label>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={handleChange}
          />
        {label}
      </label>
    </div>
  )
};

export default BasketBreakoutToggle;