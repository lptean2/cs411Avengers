import {
  RECEIVE_ALL_ITEMS,
  REQUEST_ALL_ITEMS,
  REQUEST_ALL_BASKETS,
  RECEIVE_ALL_BASKETS, REQUEST_BASKET_ITEMS, RECEIVE_BASKET_ITEMS,
  REQUEST_DELETE_BASKET,
  RECEIVE_DELETE_BASKET,
  ADD_SERIES_DATA,
} from "./actions";
import {produce} from 'immer';
import {SET_TAB, REMOVE_BASKET_ITEMS, REMOVE_SERIES_DATA} from "../app/actions";

const initialState = {
  basketItems: {},
  fetchingBasketItems: {},
  fetchingItems: false,
  allItems: [],
  fetchingBaskets: false,
  allBaskets: [],
  deletingBasket: false,
  seriesData: {},
};

const dataReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      state.seriesData = {};
      state.basketItems = {};
      break;
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
      state.basketItems[action.basketId] = action.items;
      break;
    case REQUEST_DELETE_BASKET:
      state.deletingBasket = true;
      break;
    case RECEIVE_DELETE_BASKET:
      state.deletingBasket = false;
      break;
    case ADD_SERIES_DATA:
      state.seriesData[action.basketId] = action.seriesData;
      break;
    case REMOVE_SERIES_DATA:
      state.seriesData = {};
      //delete state.seriesData[action.seriesId];
      break;
    case REMOVE_BASKET_ITEMS:
      delete state.seriesData[action.basketId];
      break;
    default:
      return state;
  }
});

export default dataReducer;