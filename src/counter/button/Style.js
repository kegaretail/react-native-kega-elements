import {
	StyleSheet,
	Dimensions
}                           from 'react-native';

const style = StyleSheet.create({

    button: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#57004e',
        elevation: 0
    },

    button_required: {
        backgroundColor: '#57004e'
    },

	button_large: {
        width: 50,
        height: 50,
        borderRadius: 25
    },

    content: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: '#ffffff',
        fontSize: 30,
        lineHeight: 37,
        backgroundColor: '#000',
    }

});

export default style;