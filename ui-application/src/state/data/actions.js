import {setBasketItems} from "../app/actions";
import {Tab as TabOptions} from "../app/Tab";
import {setEditItems} from "../edit/actions";

export const REQUEST_ALL_ITEMS = 'data/REQUEST_ALL_ITEMS';
export const RECEIVE_ALL_ITEMS = 'data/RECEIVE_ALL_ITEMS';

export const REQUEST_ALL_BASKETS = 'data/REQUEST_ALL_BASKETS';
export const RECEIVE_ALL_BASKETS = 'data/RECEIVE_ALL_BASKETS';

export const REQUEST_BASKET_ITEMS = 'data/REQUEST_BASKET_ITEMS';
export const RECEIVE_BASKET_ITEMS = 'data/RECEIVE_BASKET_ITEMS';

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

export const REQUEST_SAVE_BASKET = 'data/REQUEST_SAVE_BASKET';
export const RECEIVE_SAVE_BASKET = 'data/RECEIVE_SAVE_BASKET';
export const requestSaveBasket = ({items, basketName, basketId}) => {
	return async (dispatch) => {
		dispatch({type: REQUEST_SAVE_BASKET});
		const body = {
			Items: items.map(({ItemID, Quantity}) => {
				return {ID: ItemID, Quantity: Quantity}
			}),
		};
		if (basketId !== undefined) {
			body.ID = basketId;
		}
		if (basketName !== undefined) {
			body.Name = basketName;
		}
		const result = await window.fetch(
			'http://avengers1.web.illinois.edu/cpi_api/basket',
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body),
			});
		dispatch({type: RECEIVE_SAVE_BASKET});
		const jsonResult = await result.json();
		dispatch(requestBasket(jsonResult?.ID));
	}
};

export const requestBasket = (basketId) => {
	return async (dispatch, getState) => {
		const state = getState();
		const tab = state.app.tab;
		dispatch({type: REQUEST_BASKET_ITEMS, basketId});
		const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/basket/' + basketId);
		const jsonResult = await result.json();
		dispatch({type: RECEIVE_BASKET_ITEMS, basketId, items: jsonResult.Items});
		if(tab === TabOptions.DISPLAY) {
		    dispatch(setBasketItems(basketId, jsonResult?.Items ?? []));
		} else {
			dispatch(setEditItems(jsonResult?.Items ?? []));
		}
	}
};