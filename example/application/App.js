import React, { Component } from 'react';
import { 
    View, 
    StatusBar,
}                           from 'react-native';
import _                    from 'lodash';

import { 
    Theme,
    ThemeContext,
    ThemeProvider
}                           from 'react-native-kega-elements';

import Config               from './Config';
import Navigator            from './Navigator';

class App extends Component {

    constructor(props) {
        super(props);

        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)');

        this.style = {
            colors: {
                primary: '#000',
            },

            buttons: {
                special: {backgroundColor: '#0e0'}
            }

        };

        setTimeout(() => {

            this.setState({
                colors: {
                    primary: '#fff',
                }
            });

        }, 10000);
    }

    render() {
        console.log('####################################');

        return (
            <View style={{flex:1}}>
                
                <ThemeProvider theme={ this.style } >
                    <Navigator />
                </ThemeProvider>

            </View>
        );
    }

}

export default App;
