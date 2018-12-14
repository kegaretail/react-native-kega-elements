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

        this.state = {
            selected: null
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
            <View>
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
    onSelected: () => {}
}

export default RadioButtons;

export { RadioButton }