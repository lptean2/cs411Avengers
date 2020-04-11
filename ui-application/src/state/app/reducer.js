import {ADD_ITEM, SET_TAB, SET_BASKETS, SET_BASKET_ITEMS, SET_REGION_ID, REMOVE_BASKET_ITEMS} from "./actions";

import {Tab} from "./Tab";
import {produce} from "immer";

const initialState = {
  tab: Tab.EXPLORER,
  selectedItemIds: [],
  selectedBasketIds: [],
  selectedRegionId: "0000",
  basketItems: {}
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
    default:
      return state;
  }
});

export default appReducer;