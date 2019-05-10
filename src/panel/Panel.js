import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { 
    View, 
	StyleSheet,
	Platform,
	TouchableWithoutFeedback
}							from 'react-native';

import Touchable			from '../buttons/Touchable';

import { ThemeContext }     from '../Theme';

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

		const { reference, onPress, onLongPress, feedback, borderless, onLayout, children, disabled, style: prop_style } = this.props;
	
		let panel_style = {}
		let content_style = {}
		
		// Get style from theme
		const { theme } = this.context

		if (theme && theme.panel) {
			const { backgroundColor, borderRadius, padding, elevation } = theme.panel;

			if (backgroundColor) { panel_style.backgroundColor = backgroundColor; }
			if (borderRadius) { panel_style.borderRadius = borderRadius; }
			if (elevation !== undefined) { 
	
				//Todo: Calculate ios shadow by elevation
				if (Platform.OS == 'android') {
					panel_style.elevation = elevation;
				} else {
					panel_style.shadowColor = 'rgba(0,0,0, .4)',
					panel_style.shadowOffset = { height: 1, width: 1 },
					panel_style.shadowOpacity = 1;
					panel_style.shadowRadius = 1;
				}
		
			}

			if (padding) { panel_style.padding = padding; }
		}

		// Override button style from props
		if (prop_style) {
			
			panel_style = {
				...panel_style,
				...prop_style
			}
     
		}
      
		if (onPress !== null || onLongPress !== null ) {

			let TouchableComponent = TouchableWithoutFeedback;
			if (feedback) {
				TouchableComponent = Touchable;
			}
			
			content_style.padding = panel_style.padding;
			content_style.margin = 0;
			content_style.marginTop = 0;
			content_style.marginRight = 0;
			content_style.marginBottom = 0;
			content_style.marginLeft = 0;

            panel_style.padding = 0;

			return (
                <View 
                    ref={reference} 
                    style={[style.panel, panel_style]}
                    onLayout={onLayout}
                >
					<TouchableComponent onPress={ this.onPressed } onLongPress={ onLongPress } borderless={ borderless } disabled={ disabled } >
						<View style={[style.content, panel_style, content_style]}>
							{ children }
						</View>
					</TouchableComponent>
				</View>
			);
			
		} else {
			return (
				<View ref={reference} style={[style.panel, panel_style ]} onLayout={onLayout}>
					{ children }
				</View>
			);
		}
	}

}

Panel.contextType = ThemeContext;

Panel.propTypes = {
	style: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array,
		PropTypes.number
	]),
	onPress: PropTypes.func,
	onLongPress: PropTypes.func,
	feedback: PropTypes.bool,
	borderless: PropTypes.bool,
	onLayout: PropTypes.func,
	reference: PropTypes.func,
    disabled: PropTypes.bool,
};

Panel.defaultProps = { 
	style: {},
	onPress: null,
	onLongPress: null,
	feedback: false,
	borderless: false,
	onLayout: () => {},
	reference: (ref) => {},
    disabled: false
};

const style = StyleSheet.create({
    
	panel: {
		flex: 0,
		margin: 0,
		borderRadius: 8,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
		padding: 15,
		...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
		}),
		borderColor: (Platform.Version < 21 ? '#c8c8c8' : 'rgba(0,0,0,0)'),
		borderWidth: (Platform.Version < 21 ? StyleSheet.hairlineWidth : 0) 
    },

    content: {
        //borderRadius: 8,
		padding: 15,
		width: '100%'
    }
});

export default Panel;