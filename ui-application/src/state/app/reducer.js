import {ADD_ITEM, SET_TAB, SET_BASKETS} from "./actions";
import {Tab} from "./Tab";
const initialState = {
  selectedItemIds: [],
  selectedBasketIds: [],
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
    case SET_BASKETS:
      return{
        ...state,
        selectedBasketIds:action.basketIds
      }
    default:
      return state;
  }
}

export default appReducer;