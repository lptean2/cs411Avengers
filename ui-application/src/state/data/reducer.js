import {
  RECEIVE_ALL_ITEMS,
  REQUEST_ALL_ITEMS,
  REQUEST_ALL_BASKETS,
  RECEIVE_ALL_BASKETS, REQUEST_BASKET_ITEMS, RECEIVE_BASKET_ITEMS
} from "./actions";
import {produce} from 'immer';

const initialState = {
  fetchingBasketItems: {},
  fetchingItems: false,
  allItems: [],
  fetchingBaskets: false,
  allBaskets: [],
};

const dataReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ALL_ITEMS:
      state.fetchingItems = true;
      break;
    case RECEIVE_ALL_ITEMS:
      state.fetchingItems = false;
      state.allItems = action.allItems;
      break;
    case REQUEST_ALL_BASKETS:
      state.fetchingBaskets = true;
      break;
    case RECEIVE_ALL_BASKETS:
      state.fetchingBaskets = false;
      state.allBaskets = action.allBaskets;
      break;

    case REQUEST_BASKET_ITEMS:
      state.fetchingBasketItems[action.basketId] = true;
      break;
    case RECEIVE_BASKET_ITEMS:
      state.fetchingBasketItems[action.basketId] = false;
      break;
    default:
      return state;
  }
});

export default dataReducer;