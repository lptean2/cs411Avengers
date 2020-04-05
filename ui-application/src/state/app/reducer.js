import {ADD_ITEM, SET_TAB, SET_BASKETS, SET_BASKET_ITEMS} from "./actions";
import {Tab} from "./Tab";
import {produce} from "immer";

const initialState = {
  selectedItemIds: [],
  selectedBasketIds: [],
  tab: Tab.DISPLAY,
  basketItems: {}
};

const appReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      state.selectedItemIds.push(action.itemId);
      break;
    case SET_TAB:
      state.tab = action.tab;
      break;
    case SET_BASKETS:
      state.selectedBasketIds = action.basketIds;
      break;
    case SET_BASKET_ITEMS:
      state.basketItems[action.basketId] = action.items;
      break;
    default:
      return state;
  }
});

export default appReducer;