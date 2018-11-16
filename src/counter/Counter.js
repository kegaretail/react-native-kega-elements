import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    Animated,
    StyleSheet
}                           from 'react-native';

import Input                from './input/Input';
import Button               from './button/Button';

class Counter extends Component {

	constructor(props) {
        super(props);

        const { large, animated, value, open } = props;

        this.btn_width = (large ? 67 : 55);
        this.max_width = (large ? 234 : 180);
        this.min_width = (large ? 100 : 70);

        let start_width = this.min_width;
        let start_input_x = 0;
        let start_minus_x = (start_width-this.btn_width);

        if (!animated) {
            start_width = this.max_width;
            start_input_x = this.btn_width;
            start_minus_x = 0;
        }

        if (open) {
            this.state = {
                opened: true,
                count: value,
                width: new Animated.Value(this.max_width),
                minus_x: new Animated.Value(0),
                input_x: new Animated.Value(this.btn_width),
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

    static getDerivedStateFromProps(props, state) {
        
        let count = state.count;
        let prev_prop_count = state.prev_prop_count;
        if (props.value != state.prev_prop_count) {
            count = props.value;
            prev_prop_count = count;
        }

        const new_state = {
            ...state,
            count: count,
            prev_prop_count: prev_prop_count
        }

        return new_state;
    }

    componentWillUnmount() {
        const { count, width, minus_x, input_x } = this.state;
        const { onClosed } = this.props;

        width.stopAnimation();
        minus_x.stopAnimation();
        input_x.stopAnimation();

        clearTimeout(this.timeout);

        if (onClosed) {
            //onClosed(count);
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
        const { width, count, input_editable } = this.state;

        if (animated && input_editable) {
            this.setState({input_editable: false});
        }

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
        const { count, width, input_x, minus_x, plus_x, opened } = this.state;
        const { large, onOpen } = this.props;

        this.changeAnimation(this.value_when_clicked);

        this.setState({
            opened: false,
            show_arrow: false
        });

        if (this.timeout !== null) {clearTimeout(this.timeout);}
        this.timeout = setTimeout(() => {
            this.close();
        }, 2000);

        onOpen();

        Animated.parallel([
            Animated.spring(width, { toValue: this.max_width }),
            Animated.spring(input_x, { toValue: this.btn_width }),
            Animated.spring(minus_x, { toValue: 0 })
        ]).start(() => {
        
        });

    }

    close = () => {
        const { count, width, input_x, minus_x, plus_x, input_editable } = this.state;
        const { onClose, onClosed, zero_is_value } = this.props;

        this.changeAnimation(count);
        this.setState({opened: true});
    
        onClose();

        if (input_editable) {
            this.setState({input_editable: false});
        }
        Animated.parallel([
            Animated.spring(width, { toValue: this.min_width }),
            Animated.spring(input_x, { toValue: 0 }),
            Animated.spring(minus_x, { toValue: (this.min_width-this.btn_width) })
        ]).start(() => {
        
            if (zero_is_value) {
                this.setState({show_arrow: (count === '')});
            } else if (!zero_is_value && (count === '')) {
                this.setState({count: 0});
            }

            onClosed(count);
        
        });
    }

    changeAnimation = (count) => {
        
        if (this.last_value === count) { return; }
        this.last_value = count;

        const { width } = this.state;
        const { animated, zero_is_value } = this.props;

        this.plus_x = width.interpolate({
            inputRange: [this.min_width, this.max_width],
            outputRange: [(this.min_width-this.btn_width), (this.max_width-this.btn_width)]
        });

        if ((zero_is_value && count === 0) || count > 0) {

            if (this.input_container) {
                this.input_container.setNativeProps({ style: { zIndex: 999 } });
            }

            this.minu_opacity = width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [0, 1]
            })

            this.input_opacity = width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [1, 1]
            });

            this.plus_opacity = width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [0, 1]
            });

        } else {
  
            if (this.input_container) {
                this.input_container.setNativeProps({ style: { zIndex: 1 } });
            }

            this.minu_opacity = this.state.width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [0, 1]
            });
    
            this.input_opacity = this.state.width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [0, 1]
            });
    
            this.plus_opacity = this.state.width.interpolate({
                inputRange: [this.min_width, this.max_width],
                outputRange: [1, 1]
            });

        }
    }

    onInputPress = () => {
        const { opened, width, count } = this.state;
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

        if (this.onchange_timeout !== null) {clearTimeout(this.onchange_timeout);}
        this.onchange_timeout = setTimeout(() => {
            this.change(value)
        }, 500);

    }

    render() {

        const { count, width, input_x, minus_x, input_editable, show_arrow, input_z_index, zero_is_value,} = this.state;
        const { large, animated, button_style, max, min, showmax, disabled, input } = this.props;

        let editable = (animated ? input_editable : true);
        if (!input) {
            editable = false;
        }
        
        return (

            <Animated.View style={[style.container, {width: width}]} >

                <Animated.View style={[
                    style.btn_container,
                    {width: this.btn_width, paddingRight: 10}, 
                    {opacity: this.minu_opacity, transform: [{translateX: minus_x}]}
                ]}>
                    <Button icon="minus" onPress={this.subtract} large={large} button_style={button_style} />
                </Animated.View>   
      
                <Animated.View 
                    ref={(input_container) => { 
                        this.input_container = input_container;
                    }} 
                    style={[
                        style.input_container, 
                        {width: this.min_width}, 
                        {
                            opacity: this.input_opacity, 
                            transform: [{translateX:input_x}],
                            zIndex: input_z_index
                        }
                    ]}
                >
                    <Input 
                        style={ style.input } 
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
                        showmax={showmax}
                        disabled={disabled}
                    />
                </Animated.View>   

                <Animated.View style={[
                    style.btn_container, 
                    {width: this.btn_width, paddingLeft: 10}, 
                    {opacity: this.plus_opacity, transform: [{translateX: this.plus_x}]}
                ]}>
                    {
                        (show_arrow)
                        ?
                        <Button icon="arrow-left" onPress={this.open} large={large} disabled={(count<=min)} button_style={button_style} />
                        :
                        <Button icon="plus" onPress={this.add} large={large} disabled={(count>=max)} button_style={button_style} />
                    }

                </Animated.View>
    
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
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onClosed: PropTypes.func,
    large: PropTypes.bool,
    animated: PropTypes.bool,
    zero_is_value: PropTypes.bool,
    button_style: PropTypes.object,
    disabled: PropTypes.bool,
    showmax: PropTypes.bool,
    open: PropTypes.bool,
    input: PropTypes.bool
}

Counter.defaultProps = {
    value: 0,
    min: 0,
    max: 999,
    style: {},
    large: false,
    onChange: (value) => {},
    onOpen: (value) => {},
    onClose: (value) => {},
    onClosed: (value) => {},
    animated: true,
    zero_is_value: false,
    button_style: {background:'#000000', color:'#ffffff'},
    disabled: false,
    showmax: false,
    open: false,
    input: true,
};

const style = StyleSheet.create({
    container: {
		justifyContent: 'center'
    },

    btn_container: {
        position: 'absolute',
        width: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },

    input_container: {
        position: 'relative',
        justifyContent: 'center',
		alignItems: 'center',
        width: 70,
        padding: 5,
        zIndex: 1
    },

	input: {
        width: '100%',
        marginLeft: 14,
        marginRight: 14,
	}
});


export default Counter;