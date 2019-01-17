import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { 
    View, 
    TextInput,
    Text,
    StyleSheet,
    Platform,
    ViewPropTypes
}                           from 'react-native';

class Input extends Component {

	constructor(props) {
        super(props);

        this.state = { 
            text: props.value,
            error: false,
            error_message: props.error_message
        };

        this.input = null;

    }
    
    /*
    static getDerivedStateFromProps(nextProps, prevState) {
        const { value } = nextProps;

        return {
            ...prevState,
            text: value
        };
        
    }
    */
    
    onChangeText = (text) => {

        const { regex_allowed } = this.props;

        if (regex_allowed) {
            text = text.replace(regex_allowed, "");
        }
        
        this.setState({
            text: text,
            error: false
        });

        this.props.onChangeText(text);
    }

    clear = () => {
        if (this.input) {
            this.input.clear();
        }
    }

    value = (value) => {

        if (value != undefined) {
            this.input.value(value);
        } else {
            const { text } = this.state;
            return text;
        }

    } 

    validate = () => {

        const { required } = this.props;
        const { text } = this.state;

        if (!required) { return true; }

        const error = (text == '');

        this.error(error);

        return !error;
    }

    error = (error, message = '') => {
        const { error_message } = this.props;

        this.setState({
            error: error, 
            error_message: (message == '' ? error_message : message)
        });
    }

    render() {

        const { 
            autoFocus, placeholder, selectionColor, returnKeyType, onSubmitEditing, textAlign, keyboardType, 
            editable, error_message_color, label, label_style, raised,
            style: props_style, multiline, maxLength = null, required, icon, iconStyle
        } = this.props;

        const { text, error, error_message } = this.state;

        let input_container_style = [style.container];
        input_container_style.push(props_style);

        if (error) {
            input_container_style.push(style.container_error);
        }
  
        let input_style = [style.input];
        if (props_style && props_style.height) {
            input_style.push({height: (props_style.height-20), textAlignVertical: 'top'});
        }

        let optional_props = {}
        if (maxLength) {
            optional_props.maxLength = maxLength;
        }
        
        return (
            <View style={{width: '100%'}}>
                {
                    label
                    ?
                    <View style={style.label_container}>
                        <Text style={[style.label, label_style]}>{ label }</Text>
                    </View>
                    :
                    null

                }

                <View style={[
                    input_container_style,
                    raised && style.raised
                ]}>
                    { icon && <View style={[style.icon, iconStyle]}>{icon}</View> }
                    <TextInput
                        ref={(input) => { this.input = input;}}
                        style={input_style}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={ onSubmitEditing }
                        value={ text }
                        autoFocus={ autoFocus }
                        underlineColorAndroid='transparent'
                        placeholder={ placeholder }
                        placeholderTextColor="#d1d1d1"
                        selectionColor={ selectionColor }
                        returnKeyType= { returnKeyType }
                        textAlign={ textAlign }
                        keyboardType={ keyboardType }
                        editable={ editable }
                        multiline={ multiline }
                        {...optional_props}
                    />
            
                </View>
                {
                    required
                    ?
                        <View style={style.error_container}>
                        {
                            error
                            ?
                                <Text style={[style.error_message, {color: error_message_color}]}>{ error_message }</Text>
                            :
                            null
                        }
                        </View>
                    :
                        null

                }
            </View>
		);
    }
    
}

Input.propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    label_style: PropTypes.object,
    selectionColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    textAlign: PropTypes.string,
    keyboardType: PropTypes.string,
    value: PropTypes.string,
    editable: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    error_message: PropTypes.string,
    error_message_color: PropTypes.string,
    tintColor: PropTypes.string,
    multiline: PropTypes.bool,
    maxLength: PropTypes.number,
    raised: PropTypes.bool,
    icon: PropTypes.element,
    iconStyle: ViewPropTypes.style,
    iconRight: PropTypes.bool,
}

Input.defaultProps = {
    autoFocus: false,
    placeholder: '',
    label: '',
    label_style: {},
    selectionColor: '#000',
    tintColor: '#57004e',
    returnKeyType: 'done',
    onChangeText: (text) => {},
    onSubmitEditing: () => {},
    style: {},
    textAlign:'left',
    keyboardType: 'default',
    value: '',
    editable: true,
    required: false,
    error_message: '',
    error_message_color: '#A7001F',
    multiline: false,
    regex_allowed: null,
    raised: true
}

const style = StyleSheet.create({

	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: '#f0ffff',
        height: 50,
        borderRadius: 8,
	},

	container_error: {
		borderWidth: 2,
		borderColor: '#A7001F'
	},

	label_container: {
		paddingLeft: 10,
		paddingBottom: 5
	}, 

	label: {
		fontSize: 12
	},

	input: {
		borderWidth: 0, 
        flex: 1,
        height: 50,
	},

	error_container: {
		paddingLeft: 10,
        paddingTop: 2,
        height: 18,
	},

	error_message:{
		color: '#A7001F',
		fontSize: 12
    },

    icon: {
        paddingRight: 5,
    },

    raised: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    }

});

export default Input;