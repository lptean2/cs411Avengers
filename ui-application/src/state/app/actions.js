export const ADD_ITEM = 'app/ADD_ITEM';
export const addItem = (itemId) => ({
  type: ADD_ITEM,
  itemId,
});

export const SET_BASKETS = 'app/SET_BASKETS';
export const setBaskets = (basketIds) => ({
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