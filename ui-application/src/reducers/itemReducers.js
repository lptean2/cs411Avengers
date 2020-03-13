import {GET_ITEMS} from '../actions/types';

const initialState = {
	items: [],
	item: {}
}

function itemReducer(state = initialState, action){
	switch (action.type) {
		case GET_ITEMS:
		console.log('reducer');
			return {
				...state,
				items: action.items
			};
		default: 
			return state;
	}
}

export default itemReducer;