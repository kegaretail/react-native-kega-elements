import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { 
    View, 
    Text,
    TouchableWithoutFeedback
}                           from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';

import Style                from "./Style";

class RadioButton extends Component {
    
	constructor(props) {
        super(props);
    }

    render() {
        const { label, selected, onSelected, id, value } = this.props;

        return (
            <TouchableWithoutFeedback onPress={onSelected.bind(null, id, value)}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    {
                        selected
                        ?
                        <Icon name="radiobox-marked" size={25} color="#565656" style={{marginRight: 10}} />
                        :
                        <Icon name="radiobox-blank" size={25} color="#d9d9d9" style={{marginRight: 10}} />
                    }
                    <Text>{ label }</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

RadioButton.propTypes = {
    checked: PropTypes.bool,
    onSelected: PropTypes.func
};

RadioButton.defaultProps = { 
    label: '',
    value: '',
    selected: false,
    onSelected: () => {}
}

export default RadioButton;
