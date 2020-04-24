import {ADD_EDIT_ITEM, UPDATE_EDIT_ITEM, DELETE_EDIT_ITEM, SET_EDIT_ITEMS} from "./actions";
import {produce} from "immer";

const initialState = {
  selectedEditItems: []
};

const editReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_ITEM: {
      const existingItemIdx = state.selectedEditItems.findIndex(item => item.ItemID === action.itemId);
      if(existingItemIdx > -1) {
        state.selectedEditItems[existingItemIdx].Quantity++;
      } else {
        state.selectedEditItems.push({ItemID: action.itemId, Quantity: 1});
      }
      break;
    }
    case UPDATE_EDIT_ITEM:
      const item = state.selectedEditItems.find(item => item.ItemID === action.itemId);
      item.Quantity = action.quantity;
      break;
    case DELETE_EDIT_ITEM: 
      const existingItemIdx = state.selectedEditItems.findIndex(item => item.ItemID === action.itemId);
      if (existingItemIdx > -1){
        if(state.selectedEditItems[existingItemIdx].Quantity <= 1){
          state.selectedEditItems = state.selectedEditItems.filter(item => item.ItemID !== action.itemId);
        } else {
          state.selectedEditItems[existingItemIdx].Quantity--;
        }
      }      
      break;
    case SET_EDIT_ITEMS:
      state.selectedEditItems = action.editItems;
      break;
    default:
      return state;
  }
});

export default editReducer;