import {GET_BASKETS, NEW_BASKET, ADD_ITEM, REMOVE_ITEM} from './types';

export function newBasket(){
	return
}

export function addItem(){
	return
}

export const getBaskets = () => dispatch => {
		console.log('fetching');
		fetch('http://avengers1.web.illinois.edu/cpi_api/baskets')
		.then(res => res.json())
		.then(data => dispatch({
			type: GET_BASKETS,
			baskets: data
		})

	);
	
};

