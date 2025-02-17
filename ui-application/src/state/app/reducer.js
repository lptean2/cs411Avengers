import {
  ADD_ITEM,
  TOGGLE_BASKET_BREAKOUT,
  REMOVE_BASKET_ITEMS,
  SET_BASKET_ITEMS,
  SET_BASKETS,
  SET_REGION_ID,
  SET_TAB
} from "./actions";

import {Tab} from "./Tab";
import {produce} from "immer";

const initialState = {
  tab: Tab.EXPLORER,
  selectedItemIds: [],
  selectedBasketIds: [],
  selectedRegionId: "0000",
  basketItems: {},
  displayBasketBreakout:false
};

const appReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      state.selectedItemIds.push(action.itemId);
      break;
    case SET_REGION_ID:
      state.selectedRegionId = action.regionId;
      break;
    case SET_TAB:
      state.tab = action.tab;
      /**reset state when changing tabs**/
      state.selectedItemIds = [];
      state.selectedBasketIds = [];
      state.basketItems = {};
      break;
    case SET_BASKETS:
      state.selectedBasketIds = action.basketIds;
      break;
    case SET_BASKET_ITEMS:
      state.basketItems[action.basketId] = action.items;
      break;
    case REMOVE_BASKET_ITEMS:
      delete state.basketItems[action.basketId];
      break;
    case TOGGLE_BASKET_BREAKOUT:
      state.displayBasketBreakout = !state.displayBasketBreakout;
      break;
    default:
      return state;
  }
});

export default appReducer;