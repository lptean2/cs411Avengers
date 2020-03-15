import {ADD_ITEM, REMOVE_ITEM} from '../actions/types';

const initialState = {
	items: [],
	item: {}
}

function basketReducer(state = initialState, action){
	switch (action.type) {
		default: 
			return state;
	}
}

export default basketReducer;