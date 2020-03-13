import React, {Component} from 'react';
import Item from './Item';
import {connect} from 'react-redux';
import { getItems } from '../actions/itemActions';

class Items extends Component {

	componentDidMount() {
		this.props.getItems();
	}
	render(){
		const itemsList = this.props.items.map(item => (
			<Item key={item.ID} item={item}/>));

		return(
			<table>
				<tbody>
					<tr>
						<th>Item ID</th>
						<th>Item Name</th>
					</tr>	
					{itemsList}
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = state => ({
	items: state.items.items
})

export default connect(mapStateToProps, {getItems})(Items);