import { StyleSheet }       from 'react-native';

const style = StyleSheet.create({

	container: {
		position: 'relative',
        flexDirection: 'row',
		alignItems: 'center',
		height: 80,
		width: '100%',
		backgroundColor: '#ffffff',
	},
	
	image: {
		position: 'relative',
		width: 80,
		alignItems: 'center', 
		justifyContent: 'center',
		padding: 14
	},

	name: {
		fontWeight: 'bold'
	},

	info: {

	},

	subline: {
		color: '#666666'
	},

	counter: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		flexDirection: 'column',
		alignItems: 'center', 
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		paddingRight: 14,
		paddingLeft: 14,
		elevation: 0
	}

});

export default style;