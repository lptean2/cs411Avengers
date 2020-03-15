import React, {Component} from 'react';

class Item extends Component {
	render(){

		return(
			<tr>
				<td className={"item_id"}>{this.props.item.ID}</td>
				<td className={"item_name"}>{this.props.item.Name}</td>
			</tr>
			)
	}

}

export default Item;