import React, { Component } from 'react';

import { 
    createAppContainer,
    createBottomTabNavigator,
}                           from 'react-navigation';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';


import { 
    ThemeContext,
}                           from 'react-native-kega-elements';

import ButtonsView          from './views/ButtonsView';
import FormView             from './views/FormView';
import PanelsView           from './views/PanelsView';
import ListsView            from './views/ListsView';
import ExtraView            from './views/ExtraView';

import BottomDrawer         from './bottomdrawer/BottomDrawer';


class SytledNavigator extends Component {

    render() {
        
        const Navigator = createAppContainer(createBottomTabNavigator({

            buttons: {
                screen: ButtonsView,
                navigationOptions: ({ navigation }) => ({
                    title: "Butons",
                    tabBarIcon: ({ focused, tintColor }) => {
                        return <Icon name="hand-pointing-up" color={tintColor} size={25} />
                    }
                })
            },
    
            form: { 
                screen: FormView,
                navigationOptions: ({ navigation }) => ({
                    title: "From",
                    tabBarIcon: ({ focused, tintColor }) => {
                        return <Icon name="pen" color={tintColor} size={25} />
                    }
                })
            },
    
            panels: {
                screen: PanelsView,
                navigationOptions: ({ navigation }) => ({
                    title: "Panels",
                    tabBarIcon: ({ focused, tintColor }) => {
                        return <Icon name="view-quilt" color={tintColor} size={25} />
                    }
                })
            },
    
            lists: {
                screen: ListsView,
                navigationOptions: ({ navigation }) => ({
                    title: "view-list",
                    tabBarIcon: ({ focused, tintColor }) => {
                        return <Icon name="format-list-bulleted" color={tintColor} size={25} />
                    }
                })
            },
    
            extra: {
                screen: ExtraView,
                navigationOptions: ({ navigation }) => ({
                    title: "Extra",
                    tabBarIcon: ({ focused, tintColor }) => {
                        return <Icon name="scale" color={tintColor} size={25} />
                    }
                })
            },
    
    
        },{
            tabBarComponent: (props) => { return <BottomDrawer {...props}  /> },
            tabBarOptions: {
                activeTintColor: '#5bb4a5',
                inactiveTintColor: '#b1b7b6',
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    borderTopColor: 'rgba(0, 0, 0, 1)',
                    backgroundColor: '#d5d5d5'
                }
            }
        }));

        return <Navigator />;
    }

}

SytledNavigator.contextType = ThemeContext;

export default SytledNavigator;