import {
  RECEIVE_ALL_BASKET_OPTIONS,
  RECEIVE_ALL_ITEMS,
  RECEIVE_BASKET_ITEMS,
  RECEIVE_BASKET_META_DATA,
  RECEIVE_BASKET_TREND_SERIES_DATA,
  RECEIVE_DELETE_BASKET,
  RECEIVE_ITEM_SERIES_DATA,
  RECEIVE_PRICE_SERIES_DATA,
  REQUEST_ALL_BASKET_OPTIONS,
  REQUEST_ALL_ITEMS,
  REQUEST_BASKET_ITEMS,
  REQUEST_BASKET_META_DATA,
  REQUEST_BASKET_TREND_SERIES_DATA,
  REQUEST_DELETE_BASKET,
  REQUEST_ITEM_SERIES_DATA,
  REQUEST_PRICE_SERIES_DATA,
} from "./actions";
import {produce} from 'immer';
import {REMOVE_BASKET_ITEMS, REMOVE_SERIES_DATA, SET_TAB} from "../app/actions";

const initialState = {
  basketItems: {},
  fetchingBasketItems: {},
  fetchingItems: false,
  allItems: [],
  fetchingBaskets: false,
  allBaskets: [],
  deletingBasket: false,
  fetchingPriceSeriesData: {},
  priceSeriesData: {},
  fetchingBasketTrendSeriesData: {},
  trendSeriesData: {},
  fetchingBasketMetaData: {},
  basketMetaData: {},
  fetchingItemSeriesData: {},
  itemSeriesData: {},
};

const dataReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      state.priceSeriesData = {};
      state.basketItems = {};
      break;
    case REQUEST_ALL_ITEMS:
      state.fetchingItems = true;
      break;
    case RECEIVE_ALL_ITEMS:
      state.fetchingItems = false;
      state.allItems = action.allItems;
      break;
    case REQUEST_ALL_BASKET_OPTIONS:
      state.fetchingBaskets = true;
      break;
    case RECEIVE_ALL_BASKET_OPTIONS:
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
    case REQUEST_PRICE_SERIES_DATA:
      state.fetchingPriceSeriesData[action.basketId] = true;
      break;
    case RECEIVE_PRICE_SERIES_DATA:
      state.fetchingPriceSeriesData[action.basketId] = false;
      state.priceSeriesData[action.basketId] = action.priceSeriesData;
      break;
    case REQUEST_BASKET_TREND_SERIES_DATA:
      state.fetchingBasketTrendSeriesData[action.basketId] = true;
      break;
    case RECEIVE_BASKET_TREND_SERIES_DATA:
      state.fetchingBasketTrendSeriesData[action.basketId] = false;
      state.trendSeriesData[action.basketId] = action.trendSeriesData;
      break;
    case REQUEST_BASKET_META_DATA:
      state.fetchingBasketMetaData[action.basketId] = true;
      break;
    case RECEIVE_BASKET_META_DATA:
      state.fetchingBasketMetaData[action.basketId] = false;
      state.basketMetaData[action.basketId] = action.basketMetaData;
      break;
    case REQUEST_ITEM_SERIES_DATA:
      state.fetchingItemSeriesData[action.itemId] = true;
      break;
    case RECEIVE_ITEM_SERIES_DATA:
      state.fetchingItemSeriesData[action.itemId] = false;
      state.itemSeriesData[action.itemId] = action.itemSeriesData;
      break;
    case REMOVE_SERIES_DATA:
      state.seriesData = {};
      state.itemSeriesData = {};
      state.basketMetaData = {};
      state.trendSeriesData = {};
      state.priceSeriesData = {};
      //delete state.seriesData[action.seriesId];
      break;
    case REMOVE_BASKET_ITEMS:
      delete state.priceSeriesData[action.basketId];
      break;
    default:
      return state;
  }
});

export default dataReducer;