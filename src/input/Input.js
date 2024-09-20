import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { 
    View, 
    TextInput,
    Text,
    StyleSheet,
    Platform
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
        const { regex_allowed, formatText } = this.props;

        if (regex_allowed && (regex_allowed.test(text) === false)) {
            return false;
        }
        
        if (formatText) {
            text = formatText(text);
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
            this.setState({
                text: value
            });
        } else {
            const { text } = this.state;
            return text;
        }

    } 
    
    focus = () => {
        if (this.input) {
            this.input.focus();
        }
    }

    validate = () => {
        const { required, onValidate=null } = this.props;
        const { text } = this.state;

        if (onValidate !== null) {
            const { error, message='' } = onValidate(text);
            this.error(error, message);
            return !error;
        } else if (required) {
            let error = (text == '');
            this.error(error);
            return !error;
        } else {
            return true;
        }

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
            style: props_style, multiline, maxLength = null, required, placeholderTextColor, custom, value, onChangeText,
            iconRight, iconRightStyle, iconLeft, iconLeftStyle, onValidate,
            ...restProps
        } = this.props;

        const { text, error, error_message } = this.state;

        const { theme } = this.context;

        let root_style = {}

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
        if (theme && theme.inputs && theme.inputs[type]) {
            const context_style = theme.inputs[type];
            const { backgroundColor, borderRadius, borderWidth, borderColor, height, color, fontSize, fontFamily, selectionColor, placeholderTextColor, errorColor, errorFontSize, errorBorderColor, errorFontFamily, labelColor, labelFontSize, labelFontFamily } = context_style;

            if (backgroundColor) { container_style.backgroundColor = backgroundColor; }
            if (borderRadius !== undefined) { container_style.borderRadius = borderRadius; }
            if (borderColor) { container_style.borderColor = borderColor; }
            if (borderWidth !== undefined) { container_style.borderWidth = borderWidth; }
            if (errorBorderColor) { container_error_style.borderColor = errorBorderColor; }

            if (errorColor) { error_message_style.color = errorColor; }
            if (errorFontSize) { error_message_style.fontSize = errorFontSize; }
            if (errorFontFamily) { error_message_style.fontFamily = errorFontFamily; }

            if (selectionColor) { selection_color = selectionColor; }
            if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }

            if (color) { input_style.color = color; }
            if (fontSize) { input_style.fontSize = fontSize; }
            if (fontFamily) { input_style.fontFamily = fontFamily; }
            if (height) { 
                container_style.height = height;

                if (height > 50) {
                    input_style.height = (height-20); 
                    input_style.textAlignVertical = 'top';
                } 
         
            }

            if (labelColor) { label_style.color = labelColor; }
            if (labelFontSize) { label_style.fontSize = labelFontSize; }
            if (labelFontFamily) { label_style.fontFamily = labelFontFamily; }
        }

        // Props override
        if (selectionColor) { selection_color = selectionColor; }
        if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }


        // Get style from props
        if (props_style) {
            const { backgroundColor, borderRadius, color, fontSize, fontFamily, borderWidth, borderColor, height, selectionColor, placeholderTextColor, errorColor, errorFontSize, errorBorderColor, labelColor, labelFontSize, labelFontFamily, onChangeText, width } = props_style;

            if (backgroundColor) { container_style.backgroundColor = backgroundColor; }
            if (borderRadius !== undefined) { container_style.borderRadius = borderRadius; }
            if (borderWidth !== undefined) { container_style.borderWidth = borderWidth; }
            if (borderColor) { container_style.borderColor = borderColor; }

            if (errorBorderColor) { container_error_style.borderColor = errorBorderColor; }

            if (errorColor) { error_message_style.color = errorColor; }
            if (errorFontSize) { error_message_style.fontSize = errorFontSize; }

            if (selectionColor) { selection_color = selectionColor; }
            if (placeholderTextColor) { placeholder_text_color = placeholderTextColor; }

            if (color) { input_style.color = color; }
            if (fontSize) { input_style.fontSize = fontSize; }
            if (fontFamily) { input_style.fontFamily = fontFamily; }
            if (height) { 
                container_style.height = height;

                if (height > 50) {
                    input_style.height = (height-20); 
                    input_style.textAlignVertical = 'top';
                } 
         
            }
            
            if (labelColor) { label_style.color = labelColor; }
            if (labelFontSize) { label_style.fontSize = labelFontSize; }
            if (labelFontFamily) { label_style.fontFamily = labelFontFamily; }

            if (width) { root_style.width = width; }
            
        }

        let optional_props = {}
        if (maxLength) {
            optional_props.maxLength = maxLength;
        }

        return (
            <View style={root_style}>
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
                    { iconLeft && <View style={[style.iconLeft, iconLeftStyle]}>{iconLeft}</View> }
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
                        {...restProps}
                    />
                    { iconRight && <View style={[style.iconRight, iconRightStyle]}>{iconRight}</View> }
                </View>
                {
                    required || onValidate !== null
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
    onValidate: PropTypes.func,
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
    iconRightStyle: PropTypes.object,
    iconRight: PropTypes.element,
    iconLeftStyle: PropTypes.object,
    iconLeft: PropTypes.element,
    custom: PropTypes.string,
    formatText: PropTypes.func
}

Input.defaultProps = {
    autoFocus: false,
    placeholder: '',
    label: '',
    returnKeyType: 'done',
    onChangeText: (text) => {},
    onSubmitEditing: () => {},
    onValidate: null,
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
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: '#ffffff',
        height: 50,
        borderRadius: 8,
        //overflow: 'hidden'
	},

	label_container: {
		paddingLeft: 10,
		paddingBottom: 5
	}, 

	label: {
        fontSize: 12,
	},

	input: {
		borderWidth: 0, 
        flex: 1,
        height: '100%',
        padding: 0
	},

	error_container: {
		paddingLeft: 10,
        paddingTop: 2,
        height: 18,
	},

    iconLeft: {
        paddingRight: 5,
    },

    iconRight: {
        paddingLeft: 5
    },

    raised: {
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    error_message: {
        
    }

});

Input.contextType = ThemeContext;

export default Input;