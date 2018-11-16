import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { 
    View, 
    StyleSheet,
	TouchableWithoutFeedback
}							from 'react-native';

import Touchable			from '../buttons/Touchable';

class Panel extends Component {
	
	onPressed = () => {
		const { onPress, feedback } = this.props;
		if (feedback) {
			setTimeout(() => {
                onPress();
            }, 10);
		} else {
			onPress();
		}
	}

	render() {

		const { reference, onPress, onLongPress, feedback, borderless, onLayout, children, disabled, full, style: prop_style } = this.props;
	
        let panel_style = {}
            
        if (full) {
            panel_style.width = '100%';
        } 

		if (onPress !== null || onLongPress !== null ) {

			let TouchableComponent = TouchableWithoutFeedback;
			if (feedback) {
				TouchableComponent = Touchable;
            }

            let btn_prop_style = {...prop_style};
            btn_prop_style.padding = 0;

            if (btn_prop_style.paddingTop) { btn_prop_style.paddingTop = 0; }
            if (btn_prop_style.paddingLeft) { btn_prop_style.paddingLeft = 0; }
            if (btn_prop_style.paddingBottom) { btn_prop_style.paddingBottom = 0; }
            if (btn_prop_style.paddingRight) { btn_prop_style.paddingRight = 0; }

			return (
                <View 
                    ref={reference} 
                    style={[style.panel, style.btn_pannel, panel_style, btn_prop_style]}
                    onLayout={onLayout}
                >
					<TouchableComponent onPress={ this.onPressed } onLongPress={ onLongPress } borderless={ borderless } disabled={ disabled } >
						<View style={[style.content, panel_style, prop_style]}>
							{ children }
						</View>
					</TouchableComponent>
				</View>
			);
			
		} else {
			return (
				<View ref={reference} style={[style.panel, panel_style, prop_style ]} onLayout={onLayout}>
					{ children }
				</View>
			);
		}
	}

}

Panel.propTypes = {
	padding: PropTypes.number,
	style: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
		PropTypes.number
	]),
	content_style: PropTypes.object,
	onPress: PropTypes.func,
	onLongPress: PropTypes.func,
	feedback: PropTypes.bool,
	borderless: PropTypes.bool,
	onLayout: PropTypes.func,
	reference: PropTypes.func,
    disabled: PropTypes.bool,
    full: PropTypes.bool,
};

Panel.defaultProps = { 
	padding: 15,
	style: {},
	content_style: {},
	onPress: null,
	onLongPress: null,
	feedback: false,
	borderless: false,
	onLayout: () => {},
	reference: (ref) => {},
    disabled: false,
    full: true,
};

const style = StyleSheet.create({
    

	panel: {
		margin: 0,
		elevation: 2,
		borderRadius: 8,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        padding: 15
    },

    btn_pannel: {
        padding: 0
    },
    
    content: {
        borderRadius: 8,
        padding: 15
    }
});

export default Panel;