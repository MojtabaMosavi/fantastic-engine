const {merge} = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const webpack = require("webpack");


module.exports = merge(common,{
    mode:"development",

    // easier error-tracking 
    devtool: "source-map",
    devServer : {
        static: "./dist",
        hot: true,
    },

    // output ---------------------------------------------------
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "[name].bundle.js",
        clean: true,
    },

    // plugins --------------------------------------------------------- 
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
    ]
});