import React, { Component } from 'react';

import { 
    Text, 
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions 
}                           from 'react-native';

import Icon                 from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

class BottomDrawer extends Component {

    constructor(props) {
        super(props);

        const { navigation } = props;
        const { routes } = navigation.state;

        this.state = {
            height: new Animated.Value(60),
            more_active: false
        }

        this.drawer_open = false;

        this.main_routes = routes.slice(0, 4);
        this.other_routes = routes.slice(4, routes.length);

        this.height_open = (width/3)*Math.ceil(this.other_routes.length/3)+60
    }

    open = () => {
        const { height } = this.state;

        this.drawer_open = true;

        this.setState({more_active: true});

        Animated.spring(height,{
            toValue: this.height_open
        }).start(() => {
            
        }); 
    }

    close = () => {
        const { height } = this.state;

        this.drawer_open = false;
        this.setState({more_active: false});

        Animated.spring(height,{
            toValue: 60
        }).start(() => {
   
        }); 
    }

    toggle = () => {

        if (this.drawer_open) {
            this.close();
        } else {
            this.open();
        }
    }

    navigateTo = (routeName) => {
        const { navigation } = this.props;
        this.close();
        navigation.navigate(routeName)
    }

    render() {
        const { navigation, renderIcon, getLabelText, activeTintColor, inactiveTintColor, style } = this.props;
        const { more_active } = this.state;

        const { routes, index } = navigation.state;
        const active = routes[index];

        this.other_routes.findIndex

        let child_more_active = false;

        const { height } = this.state;
        
        return (
            <View style={[styles.container]}>
                {
                    this.other_routes.length > 0
                    ?
                        <Animated.View style={[styles.drawer, {height: height}]}>
                        {
                            
                            this.other_routes.map((route, index) => {

                                const color = active.key === route.key ? activeTintColor : inactiveTintColor;

                                if (!child_more_active && (active.key === route.key)) {
                                    child_more_active = true;
                                }

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => this.navigateTo(route.routeName)} 
                                    >
                                        <View style={[styles.drawer_button]}>
                                            { renderIcon({ route, tintColor: color, focused: (active.key === route.key), index: index }) }
                                            <Text style={[styles.drawer_button_text, {color: color}]}>
                                                { getLabelText({ route }) }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })

                        }
                            </Animated.View>
                        :
                            null
                }
                <View style={[styles.buttons, {backgroundColor: style.backgroundColor}]}>
                    {
                        this.main_routes.map((route, index) => {

                            const color = (active.key === route.key && !more_active) ? activeTintColor : inactiveTintColor;

                            return (
                                <TouchableOpacity
                                    onPress={() => this.navigateTo(route.routeName)} 
                                    style={styles.tab}
                                    key={route.routeName}
                                >   
                                    { renderIcon({ route, tintColor: color, focused: (active.key === route.key), index: index }) }
                                    
                                    <Text style={[styles.drawer_button_text, {color: color}]}>
                                        { getLabelText({ route }) }
                                    </Text>

                                </TouchableOpacity>
                            );
                        })
                        
                    }
                    {
                        this.other_routes.length > 0
                        ?
                            <TouchableOpacity
                                onPress={() => this.toggle()} //navigation.navigate(route.routeName)
                                style={styles.tab}      
                            >  
                                <Icon name="view-module" color={(more_active || child_more_active ? activeTintColor : inactiveTintColor)} size={25}/>
                                <Text style={[styles.drawer_button_text, {color: (more_active || child_more_active ? activeTintColor : inactiveTintColor)}]}>Meer</Text>
                            </TouchableOpacity>
                        :
                            null
                    }
                
                    
                </View>
                   
            </View>
        );
    }
}
export default BottomDrawer;


const styles = StyleSheet.create({

    container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        marginTop: 0,

    },

    drawer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#ffffff',
        elevation: 1,
        flexGrow: 1, 
        flexWrap: 'wrap', 
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)'
    },

    drawer_button: {
        width: (width/3),
        height: (width/3),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.05)',
    },

    drawer_button_text: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        textAlign: 'center'
    },

    tab: {
        flex: 0, 
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#ffffff', //#5bb4a5
        flexDirection: 'row',
        elevation: 1000,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.05)'
    },

    button: {
        height: 60,
        backgroundColor: '#ffffff',
        borderRadius: 40,
        elevation: 3
    },

    background: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50
    },
 
});