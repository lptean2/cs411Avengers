import {ADD_ITEM} from "./actions";

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
    default:
      return state;
  }
}

export default appReducer;