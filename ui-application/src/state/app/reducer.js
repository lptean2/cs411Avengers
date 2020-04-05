import {ADD_ITEM, SELECT_BASKET} from "./actions";

const initialState = {
  selectedItemIds: [],
};

function appReducer(state = initialState, action){
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        selectedItemIds: [
          ...state.selectedItemIds,
          action.itemId,
        ]
      };
    /*case SELECT_BASKET:
      return{
        ...state,
        selectedBasketIds:[
          ...state.selectedBasketIds,
          action.basketId,
        ]
      }*/
    default:
      return state;
  }
}

export default appReducer;