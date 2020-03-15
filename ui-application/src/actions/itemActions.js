import {GET_ITEMS} from './types';

export const getItems = () => dispatch => {
		console.log('fetching');
		fetch('http://avengers1.web.illinois.edu/cpi_api/items')
		.then(res => res.json())
		.then(data => dispatch({
			type: GET_ITEMS,
			items: data
		})
	);
	
}
