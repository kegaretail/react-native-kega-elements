import React, { Component } from 'react';
import { 
    View, 
    StatusBar,
}                           from 'react-native';

import { 
    Theme,
    ThemeContext
}                           from 'react-native-kega-elements';

import Config               from './Config';
import Navigator            from './Navigator';

class App extends Component {

    constructor(props) {
        super(props);

        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)');

        // Overwrite theme styles with config styles
        this.style = {...Theme, ...Config};
    }

    render() {
        
        return (
            <View style={{flex:1}}>
                
                <ThemeContext.Provider value={ this.style }>
                    <Navigator />
                </ThemeContext.Provider>

            </View>
        );
    }

}

export default App;
