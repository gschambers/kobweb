var path = require("path");
var webpack = require("webpack");
var env = process.env.NODE_ENV;

function isProduction() {
    return env === "production";
}

var plugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
    })
];

if (isProduction()) {
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    entry: isProduction() ? "./src/index.js" : [
        "webpack-hot-middleware/client?reload=true",
        "./src/index.js"
    ],

    output: {
        filename: "index.js",
        path: path.resolve("dist"),
        publicPath: "/dist"
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
        ]
    },

    plugins: plugins,

    devtool: isProduction() ? "source-map" : "eval"
};
