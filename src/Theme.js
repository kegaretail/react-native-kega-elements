import React                from 'react';
import PropTypes            from 'prop-types';
import _                    from 'lodash';

// Default theme
const Theme = {

    colors: {
        primary: '#57004e',
        secondary: '#fdc209'
    },

    typography: {
        h1: { fontSize: 22, fontWeight: 'normal' },
        h2: { fontSize: 18, fontWeight: 'normal' },
        h3: { fontSize: 14, fontWeight: 'normal' },

        text_small: { fontSize: 14 },
        text_medium: { fontSize: 16 },
        text_large: { fontSize: 18 },

        text_bold: { fontWeight: 'bold' },
        text_italic: { fontStyle: 'italic' },
    },

    buttons: {
        contained: { backgroundColor: '#5bb4a5', color: '#ffffff' },
        outlined: { backgroundColor : 'rgba(0, 0, 0, 0)', borderColor: '#333333', borderWidth: 1, color: '#333333', rippleColor: 'rgba(0, 0, 0, 0.3)' },
        text: { backgroundColor : 'rgba(0, 0, 0, 0)', color: '#333333'},
    }
};

class ThemeProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            theme: _.merge(Theme, props.theme),
        };

    }

    updateTheme = (updated_theme) => {
        const { theme } = this.state;
        
        this.setState({
            theme: _.merge({}, theme, updated_theme)
        });

    };
  
    getTheme = () => this.state.theme;
  
    render() {
        const { theme } = this.state;
        const { children } = this.props;

        return (
            <ThemeContext.Provider
                value={{
                    theme: theme,
                    updateTheme: this.updateTheme,
                }}
            >
                { children }
            </ThemeContext.Provider>
        );
    }
}
  
ThemeProvider.propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node.isRequired,
};

ThemeProvider.defaultProps = {
    theme: {},
};

const ThemeContext = React.createContext(Theme);

export { Theme, ThemeContext, ThemeProvider };
