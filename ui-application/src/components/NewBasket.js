import React, {useEffect, useMemo, useState} from 'react';
import Item from './Item';
import {useSelector, useDispatch} from 'react-redux';
import { newBasket, addItem, getBaskets} from '../actions/basketActions';

const NewBasket = () => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({name});

		fetch('http://avengers1.web.illinois.edu/cpi_api/basket',
			{method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{Name: name,
				Items: []
				}
			)})
		.then(res => res.json())
		.then(data => dispatch(getBaskets()))
	

		//store in state
		
	}

	return (
		<div>
		<h3>Create new Basket:</h3>
		<form onSubmit={handleSubmit}>
			<label> Basket Name: </label>
			<input type="text"
				   value={name}
				   onChange={e => setName(e.target.value)}/>
			<input type="submit" value="Submit"/>
		</form>
		</div>
	);
}

export default NewBasket;