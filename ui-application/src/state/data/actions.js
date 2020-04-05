export const REQUEST_ALL_ITEMS = 'data/REQUEST_ALL_ITEMS';
export const RECEIVE_ALL_ITEMS = 'data/RECEIVE_ALL_ITEMS';

export const REQUEST_ALL_BASKETS = 'data/REQUEST_ALL_BASKETS';
export const RECEIVE_ALL_BASKETS = 'data/RECEIVE_ALL_BASKETS';

export const REQUEST_BASKET = 'data/REQUEST_BASKET';
export const RECEIVE_BASKET = 'data/RECEIVE_BASKET';

export const requestAllItems = () => {
  return async (dispatch) => {
    dispatch({type: REQUEST_ALL_ITEMS});
    const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/items');
    const jsonResult = await result.json();
    dispatch({type: RECEIVE_ALL_ITEMS, allItems: jsonResult});
  }
};

export const requestAllBaskets = () => {
	return async (dispatch) => {
		dispatch({type: REQUEST_ALL_BASKETS});
		const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/baskets');
		const jsonResult = await result.json();
		dispatch({type: RECEIVE_ALL_BASKETS, allBaskets: jsonResult});
	}
};

export const requestBasket = (basketId) => {
	return async (dispatch) => {
		dispatch({type: REQUEST_BASKET});
		const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/basket/'+{basketId});
		const jsonResult = await result.json();
		dispatch({type: RECEIVE_BASKET, basket: jsonResult});
	}
}