export const ADD_ITEM = 'app/ADD_ITEM';
export const addItem = (itemId) => ({
  type: ADD_ITEM,
  itemId,
});

export const SELECT_BASKET = 'app/SELECT_BASKET';
export const selectBasket = (basketId) => ({
  type: SELECT_BASKET,
  basketId,
})

export const SET_TAB = 'app/SET_TAB';
export const setTab = (tab) => ({
	type: SET_TAB,
	tab,
})