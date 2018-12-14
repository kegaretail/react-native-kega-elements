import React from 'react';

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
    }
};

const ThemeContext = React.createContext(Theme);

export { Theme, ThemeContext };
