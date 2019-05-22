import React                from 'react';
import PropTypes            from 'prop-types';
import _                    from 'lodash';

// Default theme
const DefaultTheme = {

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
    },

    inputs: {
        normal: { backgroundColor: '#ffffff', selectionColor: '#000', placeholderTextColor: '#d1d1d1', errorColor: '#A7001F', errorBorderColor: '#A7001F', borderRadius: 8, labelColor: '#000' }
    },

    panel: {
        backgroundColor: '#fff', 
        borderRadius: 8,
        padding: 15,
		elevation: 2
    }
};

class ThemeData {

    constructor() {
        this.style = DefaultTheme;
    }

    get data() {
        return this.style;
    }

    merge = (theme) => {
        this.style = _.merge(this.style, theme);
    }
}

const Theme = new ThemeData();

class ThemeProvider extends React.Component {

    render() {
        const { children, theme } = this.props;
        
        Theme.merge(theme);

        return (
            <ThemeContext.Provider
                value={{
                    theme: Theme.data,
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
