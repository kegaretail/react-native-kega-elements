import React 				from 'react';
import { Text, View } 		from 'react-native';

import {
	ProductList,
	ProductListItem,
	ProductListItemCompact
}					        from 'react-native-kega-elements';

class ListsView extends React.Component {

	renderItem = ({item}) => {

		const { name, image, netAmount, quantity, max_quantity } = item;

		const subline = '€ ' + netAmount;

		let required_image = null;
		if (image) {
			required_image = require('../../assets/heineken-krat.jpg');
		}

		return <ProductListItem 
			image={ required_image }
			name={ name }
			subline={ subline }
			data={ item } 
			counter={{
				style: {background:'#5bb4a5', color:'#ffffff'},
				quantity: quantity,
				max_quantity: max_quantity,
				onChange: () => {},
				onClosed: () => {},
			}}
			styles={{
				subline: { color: '#959595' },
			}}
		/>
	}

	renderCompactItem = ({item}) => {

		const { name, netAmount, quantity, unitPrice, children } = item;

		return (
			<ProductListItemCompact 
				name={ name }
				data={ item } 
				quantity={ quantity }
				amount={ netAmount }
				unitPrice={ unitPrice }
			>
			{
				children.map((child, index) => {
					const { name, netAmount, quantity, unitPrice, children } = child;
					return <ProductListItemCompact 
						key={index} 
						name={ name }
						data={ item } 
						quantity={ quantity }
						amount={ netAmount }
						unitPrice={ unitPrice }
					/>
				})
			}
			</ProductListItemCompact>
		);
	}

	render() {

		let retour_products = [
			{ id:'123', image:'../../assets/heineken-krat.jpg', name: 'Heineken', netAmount: 12.50, unitPrice: 12.50, quantity: 2, max_quantity: 4},
			{ id:'1234', image:'', name: 'Amstel', netAmount: 11.50, unitPrice: 11.50, quantity: 1, max_quantity: 4}
		];

		let compact_retour_products = [
			{ id:'123', name: 'Heineken', netAmount: 25, unitPrice: 12.50, quantity: 2,
				children:[{ id:'123',  name: 'Amstel', description: 'sdfsddfd', netAmount: 11.50, unitPrice: 11.50, quantity: 1}]
			}
		];

		return (

			<View style={{flex:1, alignItems: 'center', backgroundColor: '#f2f2f2'}}>
				<View style={{height: 42}} />
				<Text style={{fontSize: 30}}>Lists</Text>
				<View style={{height: 14}} />
				<Text style={{fontSize: 20, marginBottom: 5}}>Product list</Text>
				<View style={{width: '100%'}}>
					<ProductList 
						products={ retour_products }
						keyExtractor={(item) => item.id }
						renderItem={this.renderItem}
					/>
				</View>
				<View style={{height: 14}} />
				<Text style={{fontSize: 20, marginBottom: 5}}>Compact product list</Text>
				<View style={{width: '100%'}}>
					<ProductList 
						products={ compact_retour_products }
						keyExtractor={(item) => item.id }
						renderItem={this.renderCompactItem}
					/>
				</View>
			</View>
	
		);
	}
}

export default ListsView;
