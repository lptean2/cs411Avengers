import {setBasketItems} from "../app/actions";
import {Tab as TabOptions} from "../app/Tab";
import {setEditItems} from "../edit/actions";

export const REQUEST_ALL_ITEMS = 'data/REQUEST_ALL_ITEMS';
export const RECEIVE_ALL_ITEMS = 'data/RECEIVE_ALL_ITEMS';

export const REQUEST_ALL_BASKETS = 'data/REQUEST_ALL_BASKETS';
export const RECEIVE_ALL_BASKETS = 'data/RECEIVE_ALL_BASKETS';

export const REQUEST_BASKET_ITEMS = 'data/REQUEST_BASKET_ITEMS';
export const RECEIVE_BASKET_ITEMS = 'data/RECEIVE_BASKET_ITEMS';

export const REQUEST_DELETE_BASKET = 'data/REQUEST_DELETE_BASKET';
export const RECEIVE_DELETE_BASKET = 'data/RECEIVE_DELETE_BASKET';

export const ADD_SERIES_DATA = 'data/ADD_SERIES_DATA';

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
		dispatch(requestAllBaskets());
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
		if(tab === TabOptions.EXPLORER) {
		    dispatch(setBasketItems(basketId, jsonResult?.Items ?? []));
		} else {
			dispatch(setEditItems(jsonResult?.Items ?? []));
		}
	}
};

export const requestDeleteBasket = (basketId) => {
	return async (dispatch, getState) => {
		dispatch({type: REQUEST_DELETE_BASKET});
		await window.fetch(
			'http://avengers1.web.illinois.edu/cpi_api/basket/' + basketId,
			{
				method: 'DELETE',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
			});
		dispatch({type: RECEIVE_DELETE_BASKET});
		dispatch(requestAllBaskets())
	}
};

export const REQUEST_SERIES_DATA = 'data/REQUEST_SERIES_DATA';
export const requestSeriesData = () => {
	return async (dispatch,getState) => {
		const state = getState();
		const selectedBasketIds = state.app.selectedBasketIds;
		const selectedRegionId = state.app.selectedRegionId;
		const basketBreakoutToggle = state.app.displayBasketBreakout;
        const selectedBasketItems = state.app.basketItems;
        
		if (selectedBasketIds?.length && selectedRegionId && basketBreakoutToggle === false) {
	      selectedBasketIds.forEach(basketId => {
	        window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?BasketID=${basketId}&RegionID=${selectedRegionId}`)
	          .then(res => res.json())
	          .then(json => {
	            dispatch({
	              type: ADD_SERIES_DATA,
	              basketId,
	              seriesData: json,
	            })
	          });
	      });
	    }
	    else if(selectedBasketIds?.length && selectedRegionId && basketBreakoutToggle === true){
	      selectedBasketIds.forEach(basketId => {
	        if(selectedBasketItems[basketId]?.length){
	          selectedBasketItems[basketId].forEach(item => {
	            window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?ItemID=${item.ItemID}&RegionID=${selectedRegionId}`)
	            .then(res => res.json())
	            .then(json => {
	              dispatch({
	                type:ADD_SERIES_DATA,
	                basketId:item.ItemID,
	                seriesData: json.map(obj => ({date:obj.PriceDate,price:obj.Price})),
	              })
	            });
	          });
	        }
	      })
	    }
	}

}
