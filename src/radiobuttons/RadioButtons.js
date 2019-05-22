import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { 
    View, 
}                           from 'react-native';

import RadioButton          from './RadioButton';

import style                from "./Style";

class RadioButtons extends Component {
    
	constructor(props) {
        super(props);

        const { children } = props;

        let selected_index = null;
        children.forEach((child, index) => {
            if (child.props.selected) {
                selected_index = index;
            }
        });

        this.state = {
            selected: selected_index
        }
    }

    onSelected = (id, value) => {
        const { onSelected } = this.props;

        this.setState({selected: id});

        onSelected(value);
    }

    render() {
        const { children } = this.props;
        const { selected } = this.state;

        return (
            <View style={{marginTop: 10}}>
                { 
                    React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {
                            id: index,
                            selected: (selected == index),
                            onSelected: this.onSelected
                        })
                    })  
                }
            </View>
        );
    }
}

RadioButtons.propTypes = {
    onSelected: PropTypes.func
};

RadioButtons.defaultProps = { 
    onSelected: () => {},
}

export default RadioButtons;

export { RadioButton }