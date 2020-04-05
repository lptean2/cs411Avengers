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