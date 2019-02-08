import React, { Component } from 'react';
import { 
    View, 
    StatusBar,
}                           from 'react-native';
import _                    from 'lodash';

import { 
    ThemeProvider
}                           from 'react-native-kega-elements';

import Navigator            from './Navigator';

class App extends Component {

    constructor(props) {
        super(props);

        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)');

        this.state = {
            v: 0
        }

        this.style = {
            colors: {
                primary: '#000',
            },

            buttons: {
                special: {backgroundColor: '#0e0'}
            },

            bottombar: {
                backgroundColor: '#000'
            }

        };

        setTimeout(() => {
 
            this.style = {
                colors: {
                    primary: '#000',
                },
    
                buttons: {
                    special: {backgroundColor: '#0e0'}
                },
    
                bottombar: {
                    backgroundColor: '#0e0'
                }
    
            };         
            
            this.setState({
                v: 2
            });

        }, 10000);
    }

    render() {
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
