import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    View,
    Text
}                           from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';

import Touchable            from '../../buttons/Touchable';

import style                from './Style';

class Button extends Component {
    
    render() {
        const { label, icon, onPress, large, button_style, disabled, rippleColor } = this.props;

        let button_style_array = [style.button];
        if (large) {
            button_style_array.push(style.button_large);
        }

        button_style_array.push(button_style);
        /*
        if (button_style != undefined && button_style.background) {
            button_style_array.push({backgroundColor:button_style.background});
        }

        if (disabled && button_style != undefined && button_style.disabled_background) {
            button_style_array.push({backgroundColor:button_style.disabled_background, elevation:0});
        }
        */

        let icon_color = '#ffffff';
        if (button_style != undefined && button_style.color) {
            icon_color = button_style.color
        }

        return (
            <View style={button_style_array}>
                <Touchable
                    disabled={disabled}
                    activeOpacity={0.6}
                    borderless={false}
                    color={rippleColor}
                    onPress={ onPress }
                    hitSlop={{top:20, right:20, bottom:20, left:20}}
                >
                    <View style={style.content}>
                        <Icon name={ icon } color={icon_color} size={(large ? 24 : 14)} />
                    </View>
                </Touchable>
            </View>
        );
    }
    
}

Button.propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func,
    large: PropTypes.bool,
    rippleColor: PropTypes.string,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    icon: 'help',
    onPress: () => {},
    rippleColor: "#fff",
    disabled: false
};

export default Button;