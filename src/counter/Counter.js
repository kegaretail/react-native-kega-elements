import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    Animated,
    StyleSheet 
}                           from 'react-native';

import Input                from './input/Input';
import Button               from './button/Button';

import { ThemeContext }     from '../Theme';

class Counter extends Component {

	constructor(props) {
        super(props);

        const { large, animated, value, open, zero_is_value, space_between } = props;

        this.input_width = (large ? 80 : 60);
        this.space_between = (space_between !== null ? space_between : (large ? 10 : 10));
        this.btn_width = (large ? 50 : 38);

        this.max_width = (this.btn_width*2) + this.input_width + (this.space_between*2);

        this.min_width = this.btn_width;

        let start_width = (value === 0 && !zero_is_value ? this.min_width : this.input_width);
        let start_input_x = 0;
        let start_minus_x = (start_width-this.btn_width);

        if (!animated) {
            start_width = this.max_width;
            start_input_x = this.btn_width;
            start_minus_x = 0;
        }

        let plus_opacity_value;
        let input_opacity_value;
        if ((zero_is_value && value === 0) || value > 0) {
            plus_opacity_value = 0;
            input_opacity_value = 1;
        } else {
            plus_opacity_value = 1;
            input_opacity_value = (value === '' || value === 0 ? 0 : 1);
        }

        if (open) {
            this.state = {
                opened: true,
                count: value,
                width: new Animated.Value(this.max_width),
                minus_x: new Animated.Value(0),
                input_x: new Animated.Value(this.btn_width+this.space_between),
                input_opacity: new Animated.Value(1),
                minu_opacity: new Animated.Value(1),
                plus_opacity: new Animated.Value(1),
                input_editable: false,
                input_z_index: (value === 0 || value === '' ? 1 : 999),
                show_arrow: false,
                prev_prop_count: value,
            }
        } else {
            this.state = {
                opened: false,
                count: value,
                width: new Animated.Value(start_width),
                minus_x: new Animated.Value(start_minus_x),
                input_x: new Animated.Value(start_input_x),
                input_opacity: new Animated.Value(input_opacity_value),
                minu_opacity: new Animated.Value(0),
                plus_opacity: new Animated.Value(plus_opacity_value),
                input_editable: false,
                input_z_index: (value === 0 || value === '' ? 1 : 999),
                show_arrow: (value === ''),
                prev_prop_count: value,
            }
        }

        this.timeout = null;
        this.onchange_timeout = null;

        this.changeAnimation(value);
        this.last_value = value;

        this.value_when_clicked = 0;

    }

    componentWillUnmount() {
        const { count, width, minus_x, input_x, opened } = this.state;
        const { onClosed } = this.props;

        width.stopAnimation();
        minus_x.stopAnimation();
        input_x.stopAnimation();

        clearTimeout(this.timeout);

        if (onClosed && opened) {
            onClosed(count);
        }
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;

        if (value !== prevProps.value && value !== this.state.count) {
            const count = ( value !== '' ? Number(value) : value );

            this.setState({ count: count }, () => {
                this.close();
            });
        }

    }

    add = () => {
        const { max } = this.props;
        const { count } = this.state;

        this.value_when_clicked = count;

        let new_count = Number(count) + 1;

        if (new_count <= max && max != 0) {
            this.change(new_count);
        }
    }

    subtract = () => {
        const { min } = this.props;
        const { count } = this.state;

        if (count == '') {
            this.setState({count: 0});
            this.change(0);
            this.value_when_clicked = 0;
        } else {

            this.value_when_clicked = count;

            let new_count = Number(count) - 1;
            if (new_count >= min) {
                this.change(new_count);
            }

        }

    }

    change = (value) => {
   
        const { onChange, animated } = this.props;
        const { count, input_editable } = this.state;

        if (animated && input_editable) {
            this.setState({input_editable: false});
        }

        console.log('change ----------> ', value);

        this.setState({ count: value }, () => {
            if (animated) { 
                if (value == 0) {
                    if (this.timeout !== null) {clearTimeout(this.timeout);}
                    this.timeout = setTimeout(() => {
                        this.close();
                    }, 1000);
                } else {
                    this.open();
                }
            }
            onChange(value);
        });

        if (animated) {
            if (this.timeout !== null) {clearTimeout(this.timeout);}
            this.timeout = setTimeout(() => {
                this.close();
            }, 1500);
        }

    }

    value = () => {
        return this.state.count;
    }

    open = () => {
        const { width, input_x, minus_x, opened, input_opacity, minu_opacity, plus_opacity } = this.state;
        const { onOpen } = this.props;

        this.changeAnimation(this.value_when_clicked);

        this.setState({
            opened: true,
            show_arrow: false
        });

        if (this.timeout !== null) {clearTimeout(this.timeout);}
        this.timeout = setTimeout(() => {
            this.close();
        }, 2000);

        onOpen();

        Animated.parallel([
            Animated.spring(width, { toValue: this.max_width, useNativeDriver:false }),
            Animated.spring(input_x, { toValue: this.btn_width+this.space_between, useNativeDriver:false }),
            Animated.spring(minus_x, { toValue: 0, useNativeDriver:false }),
            Animated.timing(minu_opacity, { toValue: 1, useNativeDriver:false }),
            Animated.spring(input_opacity, { toValue: 1, useNativeDriver:false }),
            Animated.timing(plus_opacity, { toValue: 1, useNativeDriver:false }),
        ]).start(() => {
        
        });

    }

    close = () => {
        const { count, width, input_x, minus_x, input_editable, input_opacity, minu_opacity, plus_opacity } = this.state;
        const { onChange, onClose, onClosed, empty_is_value, zero_is_value } = this.props;

        let counter_value = count;
        if (!empty_is_value && count === '') { 
            counter_value = 0; 
            this.setState({count: counter_value});
            //onChange(counter_value);
        }
   
        this.changeAnimation(counter_value);

        onClose();

        if (input_editable) {
            this.setState({input_editable: false});
        }

        let plus_opacity_value;
        let input_opacity_value;
        if ((zero_is_value && count === 0) || count > 0) {
            plus_opacity_value = 0;
            input_opacity_value = 1;
        } else {
            plus_opacity_value = 1;
            input_opacity_value = (count === '' || count === 0 ? 0 : 1);
        }

        let new_width = (count === 0 && !zero_is_value ? this.min_width : this.input_width);

        Animated.parallel([
            Animated.spring(width, { toValue: new_width, useNativeDriver:false }),
            Animated.spring(input_x, { toValue: 0, useNativeDriver:false }),
            Animated.spring(input_opacity, { toValue: input_opacity_value, useNativeDriver:false }),
            Animated.spring(minus_x, { toValue: (new_width-this.btn_width), useNativeDriver:false}),
            Animated.spring(minu_opacity, { toValue: 0, useNativeDriver:false}),
            Animated.spring(plus_opacity, { toValue: plus_opacity_value, useNativeDriver:false}),
        ]).start(() => {

            if (zero_is_value || empty_is_value) {
                this.setState({opened: false, show_arrow: (count === '')}, );
            } else {
                this.setState({opened: false});
            }

            onClosed(count);
        
        });
    }

    changeAnimation = (count) => {
        
        if (this.last_value === count) { return; }
        this.last_value = count;

        const { width } = this.state;
        const { zero_is_value } = this.props;

        this.plus_x = width.interpolate({
            inputRange: [this.min_width, this.max_width],
            outputRange: [(this.min_width-this.btn_width), (this.max_width-this.btn_width)]
        });

        if ((zero_is_value && count === 0) || count > 0) {

            if (this.input_container) {
                this.input_container.setNativeProps({ style: { zIndex: 999 } });
            }

        } else {
  
            if (this.input_container) {
                this.input_container.setNativeProps({ style: { zIndex: 1 } });
            }

        }
    }

    onInputPress = () => {
        const { width, count } = this.state;
        const { animated, disabled } = this.props;

        if (disabled) { return; }

        this.value_when_clicked = count;

        if (width._value >= (this.max_width-10)) {
            this.setState({input_editable: true});
            if (this.timeout !== null) {clearTimeout(this.timeout);}
        }else if (animated) {
            if (this.timeout !== null) {clearTimeout(this.timeout);}
            this.timeout = setTimeout(() => {
                this.close();
            }, 2000);
            this.open();
        }
        
    }

    onInputBlur = () => {
        const { animated } = this.props;
        if (animated) {
            if (this.timeout !== null) {clearTimeout(this.timeout);}
            this.timeout = setTimeout(() => {
                this.close();
            }, 2000);
        }
    }

    onInputChange = (value) => {
        const { open } = this.props;

        console.log('onInputChange', value);
        
        if (open) {
            this.change((value === '' ? value : Number(value)));
        } else {
            if (this.onchange_timeout !== null) {clearTimeout(this.onchange_timeout);}
            this.onchange_timeout = setTimeout(() => {
                this.change((value === '' ? value : Number(value)));
            }, 1500);
        }
       
    }

    render() {
        const { count, width, input_x, minus_x, input_editable, show_arrow, input_z_index, input_opacity, minu_opacity, plus_opacity } = this.state;
        const { large, animated, button_style=null, max, min, showmax, disabled, input, target, maxInputLength } = this.props;

        if (button_style !== null) {
            console.warn('The counter is update, check al counters in this app (button_style is deprecated)')
        }

        const { theme } = this.context

        let editable = (animated ? input_editable : true);
        if (!input) {
            editable = false;
        }

        let buttonRippleColor = '#fff';

        let theme_button_style = {}
        if (theme && theme.counter && theme.counter.button) {
            const { backgroundColor, color, borderRadius, rippleColor } = theme.counter.button;
 
            if (backgroundColor) { theme_button_style.backgroundColor = backgroundColor }
            if (color) { theme_button_style.color = color }
            if (borderRadius) { theme_button_style.borderRadius = borderRadius }

            if (rippleColor) { buttonRippleColor = rippleColor; }
        }

        let theme_input_style = {}
        if (theme && theme.counter && theme.counter.input) {
            const { backgroundColor, color, borderRadius, borderColor, borderWidth, overTargetBackgroundColor } = theme.counter.input;

            if (backgroundColor) { theme_input_style.backgroundColor = backgroundColor; }
            if (color) { theme_input_style.color = color; }
            if (borderRadius) { theme_input_style.borderRadius = borderRadius; }
            if (borderColor) { theme_input_style.borderColor = borderColor; }
            if (borderWidth) { theme_input_style.borderWidth = borderWidth; }

            if (target != null && count > target) {
                theme_input_style.backgroundColor = overTargetBackgroundColor;
            }

        }

        return (
            <Animated.View style={[style.container, {width: width}]} >

                {
                    !disabled
                    ?
                        <Animated.View style={[
                            style.btn_container,
                            {width: this.btn_width}, 
                            {opacity: minu_opacity, transform: [{translateX: minus_x}]}
                        ]}>
                            <Button icon="minus" onPress={this.subtract} large={large} button_style={theme_button_style} rippleColor={buttonRippleColor} />
                        </Animated.View>   
                    :
                        null
                }

                <Animated.View 
                    ref={(input_container) => { 
                        this.input_container = input_container;
                    }} 
                    style={[
                        style.input_container, 
                        {width: this.input_width}, 
                        {
                            opacity: input_opacity, 
                            transform: [{translateX:input_x}],
                            zIndex: input_z_index,
                        }
                    ]}
                >   
                    <Input 
                        style={[
                            style.input,
                            theme_input_style
                        ]} 
                        textAlign="center" 
                        keyboardType="numeric" 
                        value={String(count)} 
                        small={!(large)} 
                        editable={editable} 
                        autoFocus={input_editable} 
                        onPress={ this.onInputPress } 
                        onBlur={ this.onInputBlur } 
                        onChangeText={ this.onInputChange }
                        max={max}
                        target={target}
                        showmax={showmax}
                        disabled={disabled}
                        maxLength={maxInputLength}
                        //backgroundColor={input_background_color}
                    />
                </Animated.View>   

                {
                    !disabled
                    ?
                        <Animated.View style={[
                            style.btn_container, 
                            {width: this.btn_width, alignItems: 'flex-end'}, 
                            {opacity: plus_opacity, transform: [{translateX: this.plus_x}]}
                        ]}>
                        
                            {
                                (show_arrow)
                                ?
                                <Button icon="arrow-left" onPress={this.open} large={large} disabled={disabled} button_style={theme_button_style} rippleColor={buttonRippleColor} />
                                :
                                <Button icon="plus" onPress={this.add} large={large} disabled={(count>=max)} button_style={theme_button_style} rippleColor={buttonRippleColor} />
                            }
        
                        </Animated.View>
                    :
                        null
                }

            </Animated.View>

        );
    }
    
}

Counter.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    min: PropTypes.number, 
    max: PropTypes.number,
    target: PropTypes.number,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onClosed: PropTypes.func,
    large: PropTypes.bool,
    animated: PropTypes.bool,
    zero_is_value: PropTypes.bool,
    empty_is_value: PropTypes.bool,
    //button_style: PropTypes.object,
    disabled: PropTypes.bool,
    showmax: PropTypes.bool,
    open: PropTypes.bool,
    input: PropTypes.bool,
    space_between: PropTypes.number,
    maxInputLength: PropTypes.number,
}

Counter.defaultProps = {
    value: 0,
    min: 0,
    max: 999,
    target: null,
    style: {},
    large: false,
    onChange: (value) => {},
    onOpen: (value) => {},
    onClose: (value) => {},
    onClosed: (value) => {},
    animated: true,
    zero_is_value: false,
    empty_is_value: false,
    //button_style: {background:'#000000', color:'#ffffff'},
    disabled: false,
    showmax: false,
    open: false,
    input: true,
    space_between: null,
    maxInputLength: 3

};

Counter.contextType = ThemeContext;

const style = StyleSheet.create({

    container: {

    },

    btn_container: {
        position: 'absolute',
        padding: 0,
        justifyContent: 'center',
        zIndex: 10
    },

    input_container: {
        justifyContent: 'center',
		alignItems: 'center',
        padding: 0,
        zIndex: 1
    },

	input: {
        //width: '100%',
        //marginLeft: 14,
        //marginRight: 14,
	}
});

export default Counter;