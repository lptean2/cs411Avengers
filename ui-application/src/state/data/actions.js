export const REQUEST_ALL_ITEMS = 'data/REQUEST_ALL_ITEMS';
export const RECEIVE_ALL_ITEMS = 'data/RECEIVE_ALL_ITEMS';

export const requestAllItems = () => {
  return async (dispatch) => {
    dispatch({type: REQUEST_ALL_ITEMS});
    const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/items');
    const jsonResult = await result.json();
    dispatch({type: RECEIVE_ALL_ITEMS, allItems: jsonResult});
  }
};