export const ADD_EDIT_ITEM = 'edit/ADD_EDIT_ITEM';
export const addEditItem = (itemId,quantity) => ({
  type: ADD_EDIT_ITEM,
  itemId,
  quantity
});

export const DELETE_EDIT_ITEM = 'edit/DELETE_EDIT_ITEM';
export const removeEditItem = (itemId) => ({
	type: DELETE_EDIT_ITEM,
	itemId
})

export const UPDATE_EDIT_ITEM = 'edit/UPDATE_EDIT_ITEM';
export const updateEditItem = (itemId, quantity) => ({
	type: UPDATE_EDIT_ITEM,
	itemId,
	quantity
})

export const SET_EDIT_ITEMS = 'edit/SET_EDIT_ITEMS';
export const setEditItems = (editItems) => ({
  type: SET_EDIT_ITEMS,
  editItems,
});
