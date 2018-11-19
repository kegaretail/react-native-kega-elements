import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import {
    FlatList,
    View
}                           from 'react-native';


import style                from './Style';

class ProductList extends Component {

    render() {
        const { products, renderFooter, renderEmpty, keyExtractor, itemSeparatorComponent, renderItem } = this.props;

        return (
            <FlatList
                style={{flex:0, width: '100%', backgroundColor:'#e0e'}}
                data={ products }
                renderItem={ renderItem }
                keyExtractor={ keyExtractor }
                ItemSeparatorComponent={ itemSeparatorComponent }
                scrollEnabled={true}
                ListFooterComponent={ renderFooter }
                ListEmptyComponent={ renderEmpty }
            />
        );
    }
    
}

ProductList.propTypes = {
    type: PropTypes.string,
    products: PropTypes.array,
    counter_button_style: PropTypes.object,
    renderFooter: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderItem: PropTypes.func,
    onCounterChange: PropTypes.func,
    onCounterClosed: PropTypes.func,
    keyExtractor: PropTypes.func,
    disable_counter: PropTypes.bool,
    itemSeparatorComponent: PropTypes.func,
    renderChildren: PropTypes.bool,
    renderChildrenReasonCode: PropTypes.number,
    retour: PropTypes.bool,
}

ProductList.defaultProps = {
    type: '',
    products: [],
    renderFooter: () => { return null; },
    onCounterChange: () => {},
    onCounterClosed: () => {},
    keyExtractor: () => {},
    disable_counter: false,
    renderEmpty: () => { return null; },
    renderItem: () => { return null; }, 
    itemSeparatorComponent: () => { return <View style={ style.separator } /> },
    renderChildren: false,
    renderChildrenReasonCode: null,
    retour: false
};

export default ProductList;