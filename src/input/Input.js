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

import { ThemeContext }     from '../Theme';

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

   shouldComponentUpdate(nextProps) {

        if (nextProps.value != this.props.value) {
            this.setState({
                text: nextProps.value,
                error: false
            });
        }

        return true;
    }
    
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
            editable, label, raised,
            style: props_style, multiline, maxLength = null, required, icon, iconStyle, placeholderTextColor, custom
        } = this.props;

        const { text, error, error_message } = this.state;

        const { theme } = this.context

        let container_style = {};
        let container_error_style = {
            borderWidth: 2,
            borderColor: '#A7001F'
        };

        let error_message_style = {
            color: '#A7001F',
            fontSize: 12
        }

        let label_style = {}

        let selection_color = '#d1d1d1';
        let placeholder_text_color = '#d1d1d1';

        let input_style = {};

        // Set input type
        let type = 'normal';

        if (custom != undefined) { type = custom; }

        // Get style from theme
        if (theme.inputs && theme.inputs[type]) {
            const context_style = theme.inputs[type];
            const { backgroundColor, borderRadius, color, fontSize, selectionColor, placeholderTextColor, errorColor, errorFontSize, errorBorderColor, labelColor, lableFontSize } = context_style;

            if (backgroundColor) { container_style.backgroundColor = backgroundColor; }
            if (borderRadius) { container_style.borderRadius = borderRadius; }
            if (errorBorderColor) { container_error_style.borderColor = errorBorderColor; }

            if (errorColor) { error_message_style.color = errorColor; }
            if (errorFontSize) { error_message_style.fontSize = errorFontSize; }

            if (selectionColor) { selection_color = selectionColor; }
            if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }

            if (color) { input_style.color = color; }
            if (fontSize) { input_style.fontSize = fontSize; }

            if (labelColor) { label_style.color = labelColor; }
            if (lableFontSize) { label_style.fontSize = lableFontSize; }

        }

        // Props override
        if (selectionColor) { selection_color = selectionColor; }
        if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }



        // Get style from props
        if (props_style) {
            const { backgroundColor, borderRadius, color, fontSize, borderWidth, borderColor, height, selectionColor, placeholderTextColor, errorColor, errorFontSize, errorBorderColor, labelColor, lableFontSize } = props_style;

            if (backgroundColor) { container_style.backgroundColor = backgroundColor; }
            if (borderRadius) { container_style.borderRadius = borderRadius; }
            if (borderWidth) { container_style.borderWidth = borderWidth; }
            if (borderColor) { container_style.borderColor = borderColor; }

            if (errorBorderColor) { container_error_style.borderColor = errorBorderColor; }

            if (errorColor) { error_message_style.color = errorColor; }
            if (errorFontSize) { error_message_style.fontSize = errorFontSize; }

            if (selectionColor) { selection_color = selectionColor; }
            if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }

            if (color) { input_style.color = color; }
            if (fontSize) { input_style.fontSize = fontSize; }
            if (height) { 
                container_style.height = height;

                input_style.height = (height-20); 
                input_style.textAlignVertical = 'top';
            }
            
            if (labelColor) { label_style.color = labelColor; }
            if (lableFontSize) { label_style.fontSize = lableFontSize; }
            
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
                    style.container,
                    container_style,
                    error && container_error_style,
                    raised && style.raised
                ]}>
                    { icon && <View style={[style.icon, iconStyle]}>{icon}</View> }
                    <TextInput
                        ref={(input) => { this.input = input;}}
                        style={[
                            style.input,
                            input_style
                        ]}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={ onSubmitEditing }
                        value={ text }
                        autoFocus={ autoFocus }
                        underlineColorAndroid='transparent'
                        placeholder={ placeholder }
                        placeholderTextColor={ placeholder_text_color }
                        selectionColor={ selection_color }
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
                                <Text style={[style.error_message, error_message_style]}>{ error_message }</Text>
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
    selectionColor: PropTypes.string,
    placeholderTextColor: PropTypes.string,
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
    multiline: PropTypes.bool,
    maxLength: PropTypes.number,
    raised: PropTypes.bool,
    icon: PropTypes.element,
    iconStyle: ViewPropTypes.style,
    iconRight: PropTypes.bool,
    custom: PropTypes.string
}

Input.defaultProps = {
    autoFocus: false,
    placeholder: '',
    label: '',
    returnKeyType: 'done',
    onChangeText: (text) => {},
    onSubmitEditing: () => {},
    style: {},
    textAlign: 'left',
    keyboardType: 'default',
    value: '',
    editable: true,
    required: false,
    error_message: '',
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
		backgroundColor: '#ffffff',
        height: 50,
        borderRadius: 8,
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

Input.contextType = ThemeContext;

export default Input;