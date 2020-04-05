import {RECEIVE_ALL_ITEMS, 
  REQUEST_ALL_ITEMS, 
  REQUEST_ALL_BASKETS, 
  RECEIVE_ALL_BASKETS} from "./actions";

const initialState = {
  fetchingItems: false,
  allItems: [],
  fetchingBaskets: false,
  allBaskets: [],
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
    case REQUEST_ALL_BASKETS:
      return {
        ...state,
        fetchingBaskets: true,
      };
    case RECEIVE_ALL_BASKETS:
      return {
        ...state,
        fetchingBaskets: false,
        allBaskets: action.allBaskets,
      }
    default:
      return state;
  }
}

export default dataReducer;