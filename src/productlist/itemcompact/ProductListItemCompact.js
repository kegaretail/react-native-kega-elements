import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    View,
    Text
}                           from 'react-native';


import style                from './Style';

class ProductListItemCompact extends Component {

    renderProduct(data, parent) {
        const { retour } = this.props;
        const { quantity, description, netAmount, unitPrice } = data;

        let product_amount = (retour ? -(netAmount) : netAmount );
 
        return(
            <React.Fragment>
                <View style={ style.quantity }>
                    <Text style={ (parent ? style.parent : {}) }>{ quantity }</Text>
                </View>

                <View style={ style.description }>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={ [style.description_text, (parent ? style.parent : {})] }>{ description }</Text>
                </View>

                <View style={ style.unit_price }>
                    <Text style={ [style.unit_price_text, (parent ? style.parent : {})] }>{ unitPrice }</Text>
                </View>

                <View style={ style.amount }>
                    <Text style={ [style.amount_text, (parent ? style.parent : {})] }>{ product_amount }</Text>
                </View>

                <View style={style.action}></View>
            </React.Fragment>
        );
    }

    renderChildren() {
        const { data, renderChildren, renderChildrenReasonCode } = this.props;

        if (!renderChildren || data.deliveryItems == undefined || data.deliveryItems.length == 0) { return null; }

        const children = data.deliveryItems.map((product, index) => {
            return (
                <View style={ style.container } key={index}>
                    { this.renderProduct(product) }
                </View>
            )
        });

        return (
            <View style={ style.children } >
                { children }
            </View>
        );
     
    }

    render() {
        const { data, renderChildren, renderChildrenReasonCode } = this.props;

        let children = renderChildren;
        if (renderChildren && renderChildrenReasonCode != null && data.reasonCodeReference != renderChildrenReasonCode) {
            children = false;
        }

        return (
            <View>
                <View style={ style.container }>
                    { this.renderProduct(data, children) }
                </View>

                { 
                    children
                    ?
                        this.renderChildren() 
                    :
                        null
                }
                
            </View>
        );
    }
    
}

ProductListItemCompact.propTypes = {
    data: PropTypes.object,
    retour: PropTypes.bool,
    renderChildren: PropTypes.bool,
    renderChildrenReasonCode: PropTypes.number,
}

ProductListItemCompact.defaultProps = {
    data: {},
    retour: false,
    renderChildren: false,
    renderChildrenReasonCode: null
};

export default ProductListItemCompact;