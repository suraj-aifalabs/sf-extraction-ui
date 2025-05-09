const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.config.cjs");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

const extraConfig = merge(commonConfig, {
    mode: "development",
    output: {
        publicPath: "http://localhost:5175/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "child_app_1",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App.tsx",
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '19.1.0',
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '19.1.0',
                },
                'react-redux': {
                    singleton: true,
                    requiredVersion: '9.2.0',
                },
            },
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify({
                API_URL: "http://localhost:3001/api",
                CLIENTID: "31775f70-xxxx-xxxx-xxxx-6exxxxxxxxxx",
                AUTHORITY_URL: "https://login.microsoftonline.com/3ff7d35e-xxxx-xxxx-xxxx-dfxxxxxxxxxx",
                REDIRECTURI: "http://localhost:5175/",
                POSTLOGOUTREDIRECTURI: "http://localhost:5175/"
            }),
        }),
    ],
});

module.exports = extraConfig;
