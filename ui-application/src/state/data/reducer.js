import {RECEIVE_ALL_ITEMS, REQUEST_ALL_ITEMS} from "./actions";

const initialState = {
  fetchingItems: false,
  allItems: [],
};

function dataReducer(state = initialState, action){
  switch (action.type) {
    case REQUEST_ALL_ITEMS:
      return {
        ...state,
        fetchingItems: true,
      };
    case RECEIVE_ALL_ITEMS:
      return {
        ...state,
        fetchingItems: false,
        allItems: action.allItems,
      };
    default:
      return state;
  }
}

export default dataReducer;