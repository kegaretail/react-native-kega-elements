import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { 
    View, 
    TextInput,
    Text,
    TouchableWithoutFeedback
}                           from 'react-native';

import style                from "./Style";


class Input extends Component {

	constructor(props) {
        super(props);
        this.state = { text: props.value };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        const { value } = nextProps;

        return {
            ...prevState,
            text: value
        };
        
    }
    
    onChangeText = (text) => {
        this.setState({text});

        this.props.onChangeText(text);
    }

    clear = () => {
        if (this.refs.input) {
            this.refs.input.clear();
        }
    }

    value = (text) => {
        this.refs.input.value(text);
    } 

    render() {

        const { autoFocus, placeholder, selectionColor, returnKeyType, onSubmitEditing, textAlign, keyboardType, small, onTouchStart, editable, onPress, onBlur, selectTextOnFocus, maxLength, style: props_style, showmax, max, disabled } = this.props;
        const { text } = this.state;

        let container_style = [style.container];
        if (small) {
            container_style.push(style.container_small);
        }
        container_style.push(props_style);

        if (disabled) {
            container_style.push({
                elevation: 0,
                borderWidth: 1,
                borderColor: '#e7e7e7'
            });
        }

        let input_style = [style.input];
        if (small) {
            input_style.push(style.input_small);
        }

        let input_text_container = [style.input_text_container];
        if (small) {
            input_text_container.push(style.input_small);
        }

        return (
            <TouchableWithoutFeedback onPress={ onPress }>
                <View style={container_style}>
                {
                    editable
                    ?
                        <TextInput
                            ref="input"
                            style={input_style}
                            onChangeText={this.onChangeText}
                            onBlur={ onBlur }
                            value={ text }
                            autoFocus={ autoFocus }
                            underlineColorAndroid='transparent'
                            placeholder={ placeholder }
                            placeholderTextColor="#707070"
                            selectionColor={ selectionColor }
                            returnKeyType= { returnKeyType }
                            onSubmitEditing={ onSubmitEditing }
                            textAlign={ textAlign }
                            keyboardType={ keyboardType }
                            selectTextOnFocus={ selectTextOnFocus }
                            maxLength = { maxLength }
                        />
                    :   
                        <View style={input_text_container}>
                            <View style={{minHeight: 10, paddingBottom: 6}}>
                                <Text>{ text }</Text>
                            </View>
                        </View>
                }
                
                {
                    showmax
                    ?
                        <View style={style.max_container}>
                            <Text style={style.max_text}>{max}</Text>
                        </View>
                    :
                        null
                }
                 
                </View>
            </TouchableWithoutFeedback>
		);
    }
    
}

Input.propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    selectionColor: PropTypes.string,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onPress: PropTypes.func,
    onBlur: PropTypes.func,
    textAlign: PropTypes.string,
    keyboardType: PropTypes.string,
    value: PropTypes.string,
    small: PropTypes.bool,
    editable: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    showmax: PropTypes.bool,
    max: PropTypes.number,
    disabled: PropTypes.bool,
}

Input.defaultProps = {
    autoFocus: false,
    placeholder: '',
    selectionColor: 'rgba(70, 0, 62, 0.1)',
    returnKeyType: 'done',
    onChangeText: (text) => {},
    onSubmitEditing: () => {},
    onPress: () => {},
    onBlur: () => {},
    style: {},
    textAlign:'left',
    keyboardType: 'default',
    value: '',
    small: false,
    editable: true,
    selectTextOnFocus: true,
    maxLength: 3,
    showmax: true,
    max: 0,
    disabled: false
}

export default Input;