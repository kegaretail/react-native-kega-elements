import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    View,
    Text
}                           from 'react-native';

import style                from './Style';

class ProductListItemCompact extends Component {

    renderProduct() {
        const { children, name, unitPrice, amount, quantity } = this.props;
  
        const parent = (children && children.length > 0);
 
        return(
            <React.Fragment>
                <View style={ style.quantity }>
                    <Text style={ (parent ? style.parent : {}) }>{ quantity }</Text>
                </View>

                <View style={ style.description }>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={ [style.description_text, (parent ? style.parent : {})] }>{ name }</Text>
                </View>

                <View style={ style.unit_price }>
                    <Text style={ [style.unit_price_text, (parent ? style.parent : {})] }>{ unitPrice }</Text>
                </View>

                <View style={ style.amount }>
                    <Text style={ [style.amount_text, (parent ? style.parent : {})] }>{ amount }</Text>
                </View>

                <View style={style.action}></View>
            </React.Fragment>
        );
    }

    render() {
        const { children } = this.props;

        return (
            <View >
                <View style={ style.container }>
                    { this.renderProduct() }
                </View>
                {  children }
            </View>
        );
    }
    
}

ProductListItemCompact.propTypes = {
    name: PropTypes.string,
    quantity: PropTypes.number,
    amount: PropTypes.number,
    unitPrice: PropTypes.number,
    data: PropTypes.object
}

ProductListItemCompact.defaultProps = {
    name: '',
    quantity: 0,
    amount:0,
    unitPrice:0,
    data: {},
};

export default ProductListItemCompact;