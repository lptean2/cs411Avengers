import React, {useEffect, useMemo} from 'react';
import Item from './Item';
import {useSelector, useDispatch} from 'react-redux';
import { getItems } from '../actions/itemActions';

const Items = () => {
	const items = useSelector(state => state.items.items);
	const dispatch = useDispatch();
	const itemsList = useMemo(() => items.map(item => <Item key={item.ID} item={item}/>), [items]);

	useEffect(() => {
		dispatch(getItems());
	}, []);

	return (
		<table>
			<tbody>
			<tr>
				<th>Item ID</th>
				<th>Item Name</th>
			</tr>
			{itemsList}
			</tbody>
		</table>
	);
}

export default Items;