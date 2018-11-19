import { StyleSheet }       from 'react-native';

const style = StyleSheet.create({

	container: {
        flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 5,
		paddingRight: 14,
		paddingBottom: 5,
		paddingLeft: 14,
		backgroundColor: '#ffffff',
	},
	
	quantity: {
		width: 30
	},

	description: {
		flex: 1
	},

	description_text: {
		fontWeight: 'bold'
	},

	unit_price: {
		width: 60
	},

	unit_price_text: {
		textAlign: 'right',
		color: '#cccccc'
	},

	amount: {
		width: 60
	},

	amount_text: {
		textAlign: 'right'
	},

	parent: {
		color: '#cccccc',
		fontWeight: 'normal'
	},

	action: {
		/*width: 80*/
	},

	children: {
		marginBottom: 10
	}

});

export default style;