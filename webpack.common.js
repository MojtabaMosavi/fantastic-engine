const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ["./src/js/main.js","./src/scss/main.scss"],


    // pluings 
    plugins: [ 
        new HtmlWebpackPlugin({template:"./src/index.html",inject:true}),
        new MiniCssExtractPlugin({filename:"[name][hash].css"})
    ],

  

    // loaders ------------------------------
    module:{

        rules:[
        // html files ------------------------------------------
            {
                test: /\.html$/,
                use:["html-loader"]
            },
        

        // scss or sass file ------------------------------------
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        

        // loading images----------------------------------------
            {
                test:/\.(svg|png|jpeg|gif|jpg)$/i,
                type: "asset/resource"
            },

        // loading font
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            }
        ]
    },
}