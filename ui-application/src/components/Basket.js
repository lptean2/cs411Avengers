import React, {Component} from 'react';

class Basket extends Component {
	render(){

		return(
			<tr>
				<td className={"basket_id"}>{this.props.basket.ID}</td>
				<td className={"basket_name"}>{this.props.basket.Name}</td>
			</tr>
			)
	}

}

export default Basket;