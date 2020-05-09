import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleBasketBreakout} from '../../state/app/actions';


const BasketBreakoutToggle = props => {
  const dispatch = useDispatch();
  const isChecked = useSelector(state => state.app.displayBasketBreakout);
  const label = "Display Series by Item";

  const handleChange = useCallback((e) => {
    dispatch(toggleBasketBreakout());
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