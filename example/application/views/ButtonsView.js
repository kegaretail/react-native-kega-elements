import React 				from 'react';
import { Text, View, ScrollView } 		from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient 		from 'react-native-linear-gradient';

import {
	Button,
	ThemeContext
}					        from 'react-native-kega-elements';

class ButtonsView extends React.Component {
	render() {
		
		console.log(this.context);

		return (
	
			<ScrollView style={{flex:1, backgroundColor: '#f2f2f2'}}>

				<View style={{alignItems: 'center', padding: 14 }}>

					<View style={{height: 42}} />
					<Text style={{fontSize: 30}}>Buttons</Text>
					<View style={{height: 28}} />

					<Button label="Contained raised" raised/>
					<View style={{height: 14}} />
					<Button label="Contained raised" raised loading/>
					<View style={{height: 28}} />
					<Button label="Contained icon" icon={<Icon color="white" name="home" size={18} />} style={{backgroundColor:'#333333'}} rippleColor='rgba(255, 255, 255, 0.3)' raised/>
					<View style={{height: 14}}/>
					<Button label="Contained" full={false} />
					<View style={{height: 14}} />
					<Button label="Outlined button" outlined />
					<View style={{height: 14}} />
					<Button label="Text button" text ripple={false}/>
					<View style={{height: 14}} />
					<Button label="Contained raised" gradientProps={{colors:['#5bb4a5', '#333333'], start:{x: 0, y: 0}, end:{x: 1, y: 1}}} ViewComponent={LinearGradient} raised/>
					<View style={{height: 14}} />
					<Button label="Switch button" onPress={() =>{
			
						this.context.updateTheme({
							buttons: {
								contained: {backgroundColor: '#0e0'}
							}
						});
				
					}} outlined />
				</View>
			</ScrollView>
	
		);
	}
}

ButtonsView.contextType = ThemeContext;

export default ButtonsView;
