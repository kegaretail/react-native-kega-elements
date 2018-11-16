import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {
	TouchableOpacity, 
	TouchableNativeFeedback, 
	Platform 
}                           from 'react-native';


class Touchable extends Component {

    render() {

        const { color, borderless, children, useForeground, disabled, ripple } = this.props;

        if (ripple && Platform.OS === 'android' && Platform.Version >= 21) {

            return (
                <TouchableNativeFeedback {...this.props} background={TouchableNativeFeedback.Ripple(color, borderless)} useForeground={useForeground} disabled={disabled}>
                    { children }
                </TouchableNativeFeedback>
            );
        }

        return (
            <TouchableOpacity {...this.props} disabled={disabled}>
                { children }
            </TouchableOpacity>
        );
    }
    
}

Touchable.propTypes = {
    color: PropTypes.string,
    borderless: PropTypes.bool,
    useForeground: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    hitSlop: PropTypes.object,
    ripple: PropTypes.bool,
};

Touchable.defaultProps = {
    color: 'rgba(0, 0, 0, 0.2)',
    borderless: false,
    useForeground: false,
    disabled: false,
    onPress: () => {},
    hitSlop: {top: 10, bottom: 10, left: 10, right: 10},
    ripple: true
};

export default Touchable;