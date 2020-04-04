import {GET_BASKETS, ADD_ITEM, REMOVE_ITEM} from '../actions/types';

const initialState = {
	baskets: [],
	item: {}
}

function basketReducer(state = initialState, action){
	switch (action.type) {
		case GET_BASKETS:
		console.log('reducer');
			return {
				...state,
				baskets: action.baskets
			};
		default: 
			return state;
	}
}

export default basketReducer;