import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {displayBasketBreakout, removeSeriesData} from '../../state/app/actions';
import {requestBasketSeriesData} from "../../state/data/actions";


const BasketBreakoutToggle = props => {
  const dispatch = useDispatch();
  const isChecked = useSelector(state => state.app.displayBasketBreakout);
  const label = "Display Series by Item";

  const handleChange = useCallback((e) => {
    dispatch(displayBasketBreakout());

    dispatch(removeSeriesData());
    //todo remove current series data

    dispatch(requestBasketSeriesData());
    //todo query series data again

  }, [dispatch]);
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