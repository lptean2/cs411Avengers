import React, {useEffect, useMemo} from 'react';
import Basket from './Basket';
import {useSelector, useDispatch} from 'react-redux';
import { newBasket, addItem, getBaskets } from '../actions/basketActions';



const Baskets = () => {
	const baskets = useSelector(state => state.baskets.baskets);
	const dispatch = useDispatch();
	const basketList = useMemo(() => baskets.map(basket => <Basket key={basket.ID} basket={basket}/>), [baskets]);

	useEffect(() => {
		dispatch(getBaskets());
	}, []);


	const onSelect = (selectedList, selectedItem) =>{
		return;
	};

	const onRemove = (selectedList, selectedItema) => {
		return;
	};

	return (
		<table>
			<tbody>
			<tr>
				<th>Basket ID</th>
				<th>Basket Name</th>
			</tr>
			{basketList}
			</tbody>
		</table>
	);

}

export default Baskets;