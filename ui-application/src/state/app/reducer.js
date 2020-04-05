import {ADD_ITEM, SET_TAB, SELECT_BASKET} from "./actions";
import {Tab} from "./Tab";
const initialState = {
  selectedItemIds: [],
  tab: Tab.DISPLAY,
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
    case SET_TAB:
      return {
        ...state,
        tab: action.tab,
      }
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