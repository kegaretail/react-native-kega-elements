import {
	StyleSheet,
	Platform
}                           from 'react-native';

const style = StyleSheet.create({

	container: {
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#ffffff',
        height: 50,
        borderRadius: 25,
        elevation: 4,
		borderColor: (Platform.Version < 21 ? '#c8c8c8' : 'rgba(0,0,0,0)'),
		borderWidth: (Platform.Version < 21 ? StyleSheet.hairlineWidth : 0) 
	},

	container_small: {
		height: 38,
		borderRadius: 19
	},

	input: {
		borderWidth: 0, 
		width: '100%',
		height: 47,
		marginTop: 3,
		color: '#666666',
		justifyContent: 'center',
		alignItems: 'center',
	},

	input_small: {
		height: 35,
		marginTop: 3
	},

	input_text_container: {
		borderWidth: 0, 
		width: '100%',
		height: 47,
		marginTop: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: '#666666'
	},

    max_container: {
        position: 'absolute',
        top: 3,
        right: 12,
        zIndex: 9999
	},
	
	max_text: {
		color:'red',
		fontSize: 10
	}

});

export default style;