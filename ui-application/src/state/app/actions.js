export const ADD_ITEM = 'app/ADD_ITEM';
export const addItem = (itemId) => ({
  type: ADD_ITEM,
  itemId,
});

export const SET_REGION_ID = 'app/SET_REGION_ID';
export const setRegionId = (regionId) => ({
  type: SET_REGION_ID,
  regionId,
});

export const SET_BASKETS = 'app/SET_BASKETS';
export const setSelectedBasketIds = (basketIds) => ({
  type: SET_BASKETS,
  basketIds,
});

export const SET_TAB = 'app/SET_TAB';
export const setTab = (tab) => ({
  type: SET_TAB,
  tab,
});

export const SET_BASKET_ITEMS = 'app/SET_BASKET_ITEMS';
export const setBasketItems = (basketId, items) => ({
  type: SET_BASKET_ITEMS,
  basketId,
  items,
});

export const REMOVE_BASKET_ITEMS = 'app/REMOVE_BASKET_ITEMS';
export const removeBasketItems = (basketId) => ({
  type: REMOVE_BASKET_ITEMS,
  basketId,
});