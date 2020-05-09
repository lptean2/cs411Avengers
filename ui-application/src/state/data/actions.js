import {setBasketItems} from "../app/actions";
import {Tab as TabOptions} from "../app/Tab";
import {setEditItems} from "../edit/actions";

export const REQUEST_ALL_ITEMS = 'data/REQUEST_ALL_ITEMS';
export const RECEIVE_ALL_ITEMS = 'data/RECEIVE_ALL_ITEMS';

export const REQUEST_ALL_BASKET_OPTIONS = 'data/REQUEST_ALL_BASKETS';
export const RECEIVE_ALL_BASKET_OPTIONS = 'data/RECEIVE_ALL_BASKETS';

export const REQUEST_DELETE_BASKET = 'data/REQUEST_DELETE_BASKET';
export const RECEIVE_DELETE_BASKET = 'data/RECEIVE_DELETE_BASKET';

export const ADD_PRICE_SERIES = 'data/ADD_SERIES_DATA';

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
		dispatch({type: REQUEST_ALL_BASKET_OPTIONS});
		const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/baskets');
		const jsonResult = await result.json();
		dispatch({type: RECEIVE_ALL_BASKET_OPTIONS, allBaskets: jsonResult});
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
		dispatch(requestChartData(jsonResult?.ID));
		dispatch(requestAllBaskets());
	}
};

export const requestChartData = (basketId, regionId) => {
	return (dispatch) => {
		dispatch(requestBasketPriceSeries(basketId, regionId));
		dispatch(requestBasketMetaData(basketId, regionId));
		dispatch(requestBasketTrends(basketId));
		dispatch(requestBasketItems(basketId));
	}
};

export const REQUEST_PRICE_SERIES_DATA = 'data/REQUEST_PRICE_SERIES_DATA';
export const RECEIVE_PRICE_SERIES_DATA = 'data/RECEIVE_PRICE_SERIES_DATA';
export const requestBasketPriceSeries = (basketId, regionId) => {
	return async (dispatch) => {
		dispatch({type: REQUEST_PRICE_SERIES_DATA, basketId});
		const res = await window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?BasketID=${basketId}&RegionID=${regionId}`);
		const json = await res.json();
		dispatch({type: RECEIVE_PRICE_SERIES_DATA, basketId, priceSeriesData: json ?? {}});
	}
};
export const REQUEST_BASKET_TREND_SERIES_DATA = 'data/REQUEST_BASKET_TREND_SERIES_DATA';
export const RECEIVE_BASKET_TREND_SERIES_DATA = 'data/RECEIVE_BASKET_TREND_SERIES_DATA';
export const requestBasketTrends = (basketId) => {
	return async (dispatch) => {
		dispatch({type: REQUEST_BASKET_TREND_SERIES_DATA, basketId});
		const result = await window.fetch('http://avengers1.web.illinois.edu/cpi_api/trends?BasketID=' + basketId);
		dispatch({
			type: RECEIVE_BASKET_TREND_SERIES_DATA,
			basketId,
			trendSeriesData:  await result.json()
		});
	}
};
export const REQUEST_BASKET_META_DATA = 'data/REQUEST_BASKET_META_DATA';
export const RECEIVE_BASKET_META_DATA = 'data/RECEIVE_BASKET_META_DATA';
export const requestBasketMetaData = (basketId, regionId) => {
	return async (dispatch) => {
		dispatch({type: REQUEST_BASKET_META_DATA, basketId});
		const result = await window.fetch(`http://avengers1.web.illinois.edu/cpi_api/metadata/basket/${basketId}/${regionId}`);
		const jsonResult = await result.json();
		dispatch({type: RECEIVE_BASKET_META_DATA, basketId, basketMetaData: jsonResult});
	}
};
export const REQUEST_BASKET_ITEMS = 'data/REQUEST_BASKET_ITEMS';
export const RECEIVE_BASKET_ITEMS = 'data/RECEIVE_BASKET_ITEMS';
export const requestBasketItems = (basketId) => {
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

export const REQUEST_ITEM_SERIES_DATA = 'data/REQUEST_ITEM_SERIES_DATA';
export const RECEIVE_ITEM_SERIES_DATA = 'data/RECEIVE_ITEM_SERIES_DATA';
export const requestItemSeriesData = (itemId,regionId) => {
	return async (dispatch, getState) => {
        const basketItems = getState(state.app.basketItems);
		dispatch({type: REQUEST_ITEM_SERIES_DATA, itemId});
		const result = await window.fetch(`http://avengers1.web.illinois.edu/cpi_api/series?ItemID=${itemId}&RegionID=${regionId}`);
		const json = await result.json();
        dispatch({
          type:RECEIVE_ITEM_SERIES_DATA,
          itemId: itemId,
          itemSeriesData: json,
        });
        
	}
}

export const requestSeriesData = () => {
	return async (dispatch,getState) => {
		const state = getState();
		const selectedBasketIds = state.app.selectedBasketIds;
		const selectedRegionId = state.app.selectedRegionId;
		const basketBreakoutToggle = state.app.displayBasketBreakout;
		const itemIdSet = new Set();

	      selectedBasketIds.forEach(basketId => {
			dispatch(requestBasketPriceSeries(basketId, selectedRegionId));
			dispatch(requestBasketMetaData(basketId, selectedRegionId));
			dispatch(requestBasketTrends(basketId));
			dispatch(requestBasketItems(basketId));
			
	      });
		const basketItemEntries = Object.entries(basketItems);
		console.log('basketItemEntries',basketItemEntries);
		if(basketItemEntries.length){
          basketItemEntries.forEach(([basketId,items]) => {
          	items.forEach(item =>{
          	  if(!itemIdSet.has(item.ItemID)){
          	  	itemIdSet.add(item.ItemID);
                dispatch(requestItemSeriesData(item.ItemID, selectedRegionId));
          	  }
          	})
      });
	}	     
	}

}

export const requestItemSeriesData