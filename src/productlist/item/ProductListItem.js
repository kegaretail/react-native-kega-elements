import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    View,
    Text,
    Animated,
    Image
}                           from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';

import Counter              from '../../counter/Counter';

import style                from './Style';

class ProductListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bg_color: new Animated.Value(0),
            error: false
        }

        this.bg_color_animation = this.state.bg_color.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255, 255, 255, 1)', 'rgba(242, 242, 242, 1)']
        });
    }

    onCounterOpen = () => {
        Animated.spring( 
            this.state.bg_color, { toValue: 100 }
        ).start();
    }

    onCounterClose = () => {
        Animated.spring( 
            this.state.bg_color, { toValue: 0 }
        ).start();
    }

    onCounterChange = (value) => {
        const { data, onChange } = this.props;

        if (onChange) {
            onChange({data: data, value: value});
        }
        
    }

    onCounterClosed = (value) => {
        const { data, onClosed } = this.props;

        if (onClosed) {
            onClosed({data: data, value: value});
        }
        
    }

    renderImage = (image) => {

        if (image) {
            return <Image style={{height:'100%'}} resizeMode="contain" source={image}/>
        } else {
            return <Icon name="image" size={30} color="#DEDEDE" />;
        }

    }

    renderCounter = () => {
        const { counter } = this.props;

        if (counter == null) { return null; }

        const { quantity, max_quantity, style: counter_button_style, disable: disable_counter } = counter;

        let max = 999;
        let showmax = false;
        if (max_quantity != undefined) {
            max = max_quantity;
            showmax = true;
        }

        return (
            <View style={style.counter}>
                <View style={{alignSelf: 'flex-end'}}>
                    <Counter
                        ref="counter"
                        value={ quantity } 
                        button_style={ counter_button_style }
                        onOpen={ this.onCounterOpen }
                        onClose={ this.onCounterClose }
                        onClosed={ this.onCounterClosed }
                        onChange={ this.onCounterChange }
                        disabled={ disable_counter }
                        max={ max }
                        showmax={ showmax }
                    />
                </View>
            </View>
        );
    }

    render() {

        const { image, name, subline } = this.props;

        return (
            <Animated.View style={[style.container, {backgroundColor: this.bg_color_animation }]}>

                <View style={style.image}>
                    { this.renderImage(image) }
                </View>

                <View style={style.info}>
                    <Text style={style.name}>{ name }</Text>
                    <Text style={style.price}>{ subline }</Text>
                </View>
                {
                    this.renderCounter()
                }
            </Animated.View>
        );

    }
    
}

ProductListItem.propTypes = {
    data: PropTypes.object,
    counter_button_style: PropTypes.object,
    onChange: PropTypes.func,
    onClosed: PropTypes.func,
    disable_counter: PropTypes.bool,
    counter: PropTypes.object,
}

ProductListItem.defaultProps = {
    onChange: null,
    disable_counter: false,
    counter: null
};

export default ProductListItem;