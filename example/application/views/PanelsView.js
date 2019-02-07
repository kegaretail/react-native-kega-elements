import React 				from 'react';
import { Text, View, ScrollView } 		from 'react-native';

import {
	Panel
}					        from 'react-native-kega-elements';

class PanelsView extends React.Component {
	render() {
		return (
			<ScrollView style={{flex:1, backgroundColor: '#f2f2f2'}}>
				<View style={{alignItems: 'center', padding: 14 }}>

					<View style={{height: 42}} />
					<Text style={{fontSize: 30}}>Panel</Text>

					<View style={{height: 14}} />
					<Panel>
						<Text>Test panel</Text>
					</Panel>

					<View style={{height: 14}} />
					<Panel 
						feedback 
						onPress={() => {}}
					>
						<Text>Test panel</Text>
						<Text>Test panel</Text>
						<Text>Test panel</Text>
						<Text>Test panel</Text>
					</Panel>

					<View style={{height: 14}} />
					<Panel style={{flexDirection: 'row'}}>
						<View style={{flex:0.5}}><Text>Row 1</Text></View>
						<View style={{flex:0.5}}><Text>Row 2</Text></View>
					</Panel>

					<View style={{height: 14}} />
					<Panel>
						<View><Text>Column 1</Text></View>
						<View><Text>Column 2</Text></View>
					</Panel>

					<View style={{height: 14}} />
					<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
						<Panel style={{flex:0.48}}><Text>Column 1</Text></Panel>
						<Panel style={{flex:0.48}}><Text>Column 2</Text></Panel>
					</View>
			
				</View>
			</ScrollView>
		);
	}
}

export default PanelsView;
