import React 				from 'react';
import { Text, View, ScrollView } 		from 'react-native';

import {
	Panel
}					        from 'react-native-kega-elements';

class ExtraView extends React.Component {
	render() {
		return (
			<ScrollView style={{flex:1, backgroundColor: '#f2f2f2'}}>
				<View style={{alignItems: 'center', padding: 14 }}>
				<View style={{height: 42}} />
					<Text style={{fontSize: 30}}>Extra</Text>
					<View style={{height: 14}} />
				</View>
			</ScrollView>
		);
	}
}

export default ExtraView;
