import {ADD_EDIT_ITEM, SET_EDIT_BASKET_ITEMS} from "./actions";
import {Tab} from "./Tab";
import {produce} from "immer";

const initialState = {
  selectedEditItemIds: [],
};

const editReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_ITEM:
      state.selectedEditItemIds.push({itemId:action.itemId,quantity:action.quantity});
      break;
    case REMOVE_EDIT_ITEM:
      break;
    case SET_EDIT_BASKET_ITEMS:
      state.selectedEditItemIds = action.editItemIds;
      break;
    default:
      return state;
  }
});

export default editReducer;