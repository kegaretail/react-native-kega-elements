import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
  View,
  Text,
  Platform,
  StyleSheet,
  ViewPropTypes
}                           from 'react-native';

import Touchable            from './Touchable';

import { ThemeContext }     from '../Theme';

class Button extends Component {

    render() {

        console.log(this.context);
        
        const { 
            type, label, labelStyle, disabled, raised, borderRadius, ripple, rippleColor, icon, 
            iconRight, onPress, ViewComponent = View, gradientProps, full, style: prop_style 
        } = this.props;

        let is_raised = raised;

        let container_style = {};
        let inner_container_style = {};
        let label_style = labelStyle

        if (prop_style) {
            container_style = {...prop_style}

            if (container_style.backgroundColor) {
                inner_container_style.backgroundColor = container_style.backgroundColor;
                delete container_style.backgroundColor;
            }

            if (container_style.borderColor) {
                inner_container_style.borderColor = container_style.borderColor;
                delete container_style.borderColor;
            }

            if (container_style.borderWidth) {
                inner_container_style.borderWidth = container_style.borderWidth;
                delete container_style.borderWidth;
            }

            if (container_style.paddingLeft) {
                inner_container_style.paddingLeft = container_style.paddingLeft;
                delete container_style.paddingLeft;
            }

            if (container_style.paddingRigth) {
                inner_container_style.paddingRigth = container_style.paddingRigth;
                delete container_style.paddingRigth;
            }

        }

        switch(type) {

            case 'contained':

                break;

            case 'outlined':
                is_raised = false;

                var { borderWidth, backgroundColor, borderColor } = inner_container_style;

                inner_container_style = {
                    ...inner_container_style,
                    borderColor: (borderColor ? borderColor : '#333333'),
                    borderWidth: (borderWidth ? borderWidth : 1),
                    backgroundColor: (backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0)')
                };

                if (!labelStyle.color) {
                    labelStyle.color = '#333333';
                }

                break;

            case 'text':
                is_raised = false;

                inner_container_style = {
                    ...inner_container_style,
                    backgroundColor: 'rgba(255, 255, 255, 0)'
                }

                if (!label_style.color) {
                    label_style = {
                        ...label_style,
                        color: '#333333'
                    }
                }

                break;

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

        return (
            <View style={[
                style.container, 
                is_raised && style.raised,
                container_style
            ]}>
                <Touchable
					disabled={disabled}
					onPress={onPress}
					color={rippleColor}
					activeOpacity={0.4}
					borderless={borderRadius > 0}
                    useForeground={borderRadius > 0}
                    ripple={ripple}
				>
                    <ViewComponent 
                        style={[
                            style.container, 
                            style.inner_container,
                            inner_container_style
                        ]}
                        {...gradientProps}
                    >
                        { !iconRight && icon }
          
                        <Text style={[
                            style.label,
                            label_style
                        ]}>
                            { label }
                        </Text>
            
                        { iconRight && icon }
                    </ViewComponent>
                </Touchable>
            </View>
        );

    }

}

Button.contextType = ThemeContext;

Button.propTypes = {
    type: PropTypes.oneOf(['contained', 'outlined', 'text']),
    label: PropTypes.string,
    labelStyle: Text.propTypes.style,
    style: ViewPropTypes.style,
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
    ViewComponent: PropTypes.any
}

Button.defaultProps = {
    type: 'contained',
    label: 'Button label',
    labelStyle: {},
    raised: false,
    disabled: false,
    ripple: true,
    rippleColor: 'ThemeAttrAndroid',
    borderRadius: 25,
    iconRight: false,
    full: true,
    gradientProps: {},
    onPress: () => console.log('Please attach a method to this component'),
}

const style = StyleSheet.create({

    container: {
        flexDirection: 'row',
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