import React 				from 'react';
import { Text, View, ScrollView } 		from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';

import {
	Button,
	Input,
	RadioButton,
	RadioButtons,
}					        from 'react-native-kega-elements';

class FormView extends React.Component {
	render() {
		return (
			<ScrollView style={{flex:1, backgroundColor: '#f2f2f2'}}>
				<View style={{alignItems: 'center', padding: 14 }}>
                    <View style={{height: 42}} />
                    <Text style={{fontSize: 30}}>From</Text>
					<View style={{height: 14}} />

     				<RadioButtons>
						<RadioButton label="Radio label 1" value="radio1" />
						<RadioButton label="Radio label 2" value="radio2" />
						<RadioButton label="Radio label 3" value="radio3" />
                    </RadioButtons>
					
					<View style={{height: 14}} />
					<Input 
						ref={ (input) => { this.input = input;} }
						label="Label" 
						placeholder="Placeholder" 
						regex_validate={/[0-9]{12}$/g}
						error_message="Verkeerde input"
						required={true}
					/>
					<View style={{height: 14}} />
					<Input 
						ref={ (input) => { this.input = input;} }
						label="Label" 
						placeholder="Placeholder" 
						regex_validate={/[0-9]{12}$/g}
						error_message="Verkeerde input"
						required={true}
						style={{height: 200}}
						multiline={true}
					/>
					<View style={{height: 14}} />
					<Input 
						ref={ (input) => { this.input2 = input;} }
						style={{borderWidth: 1, borderColor: '#333333', backgroundColor:'rgba(2455, 255, 255, 0)', borderRadius: 25}}
						raised={false}
						placeholder="Placeholder" 
						regex_validate={/[0-9]{12}$/g}
						error_message="Verkeerde input"
						required={true} 
						icon={<Icon color="#333333" name="home" size={18} />}
					/>
					<View style={{height: 14}} />
					<Button label="Submit" onPress={() => {this.input.validate(); this.input2.validate();}} raised/>
					<View style={{height: 28}} />
				</View>
			</ScrollView>
		);
	}
}

export default FormView;
