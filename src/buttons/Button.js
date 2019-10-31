import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
  View,
  Text,
  Platform,
  StyleSheet,
  ViewPropTypes,
  ActivityIndicator
}                           from 'react-native';

import Touchable            from './Touchable';

import { ThemeContext }     from '../Theme';

class Button extends Component {

    render() {

        const { 
            custom, label, disabled, raised, borderRadius, ripple, rippleColor, icon, 
            iconRight, onPress, ViewComponent = View, gradientProps, full, style: prop_style,
            contained, outlined, text,loading
        } = this.props;

        const { theme } = this.context

        let is_raised = raised;

        let container_style = {};
        let inner_container_style = {};
        let label_style = {};

        let buttonRippleColor = 'ThemeAttrAndroid';

        // Set button type
        let type = 'contained';
        if (outlined) {
            type = 'outlined';
        } else if (text) {
            type = 'text';
        }

        if (custom != undefined) { type = custom; }

        // Get style from theme
        if (theme && theme.buttons && theme.buttons[type]) {
            const context_style = theme.buttons[type];
            const { backgroundColor, borderColor, borderRadius, borderWidth, color, fontSize, fontWeight, rippleColor, height, width, paddingLeft, paddingRight } = context_style;

            if (backgroundColor) { inner_container_style.backgroundColor = backgroundColor; }
            if (borderColor) { inner_container_style.borderColor = borderColor; }
            if (borderRadius !== undefined) { 
                inner_container_style.borderRadius = borderRadius; 
                container_style.borderRadius = borderRadius; 
            }
            if (borderWidth !== undefined) { inner_container_style.borderWidth = borderWidth; }

            if (paddingLeft !== undefined) { inner_container_style.paddingLeft = paddingLeft; }
            if (paddingRight !== undefined) { inner_container_style.paddingRight = paddingRight; }
           
            if (color) { label_style.color = color; }
            if (fontSize) { label_style.fontSize = fontSize; }
            if (fontWeight) { label_style.fontWeight = fontWeight; }

            if (rippleColor) { buttonRippleColor = rippleColor; }
            
            if (height) { container_style.height = height; }
            if (width) { container_style.width = width; }

        }

        if (rippleColor) {
            buttonRippleColor = rippleColor;
        }
        
        // Override button style from props
        if (prop_style) {
            const { backgroundColor, borderColor, borderWidth, borderRadius, color, fontSize, fontWeight, rippleColor, height, width, paddingLeft, paddingRight, ...prop_style_rest} = prop_style;

            if (backgroundColor) { inner_container_style.backgroundColor = backgroundColor; }
            if (borderColor) { inner_container_style.borderColor = borderColor; }
            if (borderRadius !== undefined) { 
                inner_container_style.borderRadius = borderRadius; 
                container_style.borderRadius = borderRadius; 
            }
            if (borderWidth !== undefined) { inner_container_style.borderWidth = borderWidth; }

            if (paddingLeft !== undefined) { inner_container_style.paddingLeft = paddingLeft; }
            if (paddingRight !== undefined) { inner_container_style.paddingRight = paddingRight; }

            if (color) { label_style.color = color; }
            if (fontSize) { label_style.fontSize = fontSize; }
            if (fontWeight) { label_style.fontWeight = fontWeight; }

            if (rippleColor) { buttonRippleColor = rippleColor; }

            if (height) { container_style.height = height; }
            if (width) { container_style.width = width; }

        }

        if (disabled) {
            container_style.opacity = 0.75;
        }

        if (full) {
       
            container_style = {
                ...container_style,
                width: '100%'
            }

            inner_container_style = {
                ...inner_container_style,
                width: '100%'
            }
            
        } 

        let borderless = ( inner_container_style.borderRadius > 0 );
        let useForeground = ( inner_container_style.borderRadius > 0 );

        return (
            <View style={{flexDirection: 'row'}}>
                <View style={[
                    style.container, 
                    is_raised && style.raised,
                    container_style
                ]}>
                    <Touchable
                        disabled={disabled}
                        onPress={onPress}
                        color={buttonRippleColor}
                        activeOpacity={0.4}
                        borderless={borderless}
                        useForeground={useForeground}
                        ripple={ripple}
                        style={{width: '100%'}} // Android 4.4 fix
                    >
                        <ViewComponent 
                            style={[
                                style.container, 
                                style.inner_container,
                                inner_container_style
                            ]}
                            {...gradientProps}
                        >   
                            { (!iconRight && !loading) && icon }
            
                            {
                                loading
                                ?
                                <ActivityIndicator size="small" color={(label_style.color ? label_style.color : '#fff')}/>
                                :
                                <Text style={[ style.label, label_style ]}> { label } </Text>
                            }
                
                            { (iconRight && !loading) && icon }
                        </ViewComponent>
                    </Touchable>
                </View>
            </View>
        );

    }

}

Button.contextType = ThemeContext;

Button.propTypes = {
    type: PropTypes.oneOf(['contained', 'outlined', 'text']),
    label: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    ripple: PropTypes.bool,
    rippleColor: PropTypes.string,
    borderRadius: PropTypes.number,
    icon: PropTypes.element,
    iconRight: PropTypes.bool,
    full: PropTypes.bool,
    gradientProps: PropTypes.object,
    onPress: PropTypes.func,
    ViewComponent: PropTypes.any,
    custom: PropTypes.string,
    contained: PropTypes.bool,
    outlined: PropTypes.bool,
    text: PropTypes.bool,
    loading: PropTypes.bool 
}

Button.defaultProps = {
    type: 'contained',
    label: 'Button label',
    raised: false,
    disabled: false,
    ripple: true,
    borderRadius: 25,
    iconRight: false,
    full: true,
    gradientProps: {},
    onPress: () => console.log('Please attach a method to this component'),
    contained: true,
    outlined: false,
    text: false,
    loading: false
}

const style = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        height: 50,
        overflow: 'hidden'
    },

    inner_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: '100%',
        width: '100%',
        backgroundColor: '#5bb4a5',
    },

    label: {
        backgroundColor: 'transparent',
        letterSpacing: 1,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#ffffff',
		textAlign: 'center',
        padding: 8,

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
                backgroundColor: '#fff',
                elevation: 2,
            },
        }),
    }

});

export default Button;