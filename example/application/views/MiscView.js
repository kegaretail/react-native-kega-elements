import React 				from 'react';
import { Text, View, ScrollView } 		from 'react-native';

import {
	Counter
}					        from 'react-native-kega-elements';

class MiscView extends React.Component {
	render() {
		return (
			<ScrollView style={{flex:1, backgroundColor: '#f2f2f2'}}>
				<View style={{alignItems: 'center', padding: 14 }}>
                    <View style={{height: 42}} />
					<Text style={{fontSize: 30}}>Overigen</Text>
					<View style={{height: 14}} />
					<View style={{width: '100%', alignItems:'flex-end'}}>
						<Counter button_style={{background:'#5bb4a5'}} />
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default MiscView;
