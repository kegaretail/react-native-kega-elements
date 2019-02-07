var path = require("path");
var config = {
    watchFolders: [
        path.resolve(__dirname, "../")
    ],
    resolver: {
        extraNodeModules: {
            react: path.resolve(__dirname, "node_modules/react"),
            '@babel/runtime': path.resolve(__dirname, "node_modules/@babel/runtime"),
            'prop-types': path.resolve(__dirname, "node_modules/prop-types"),
            'react-native-vector-icons': path.resolve(__dirname, "node_modules/react-native-vector-icons") 
        },
        providesModuleNodeModules: [
            'react'
        ],
    }
}

module.exports = config;