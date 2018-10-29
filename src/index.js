'use strict';
//use to rout https://github.com/mtrpcic/pathjs
// use to base cmp https://material-ui.com/guides/api/
// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
//https://css-tricks.com/building-skeleton-screens-css-custom-properties/ для прелоадера


//jquery жрет очень много места
/*пример подключения
* new webpack.ProvidePlugin({
 $ : "jquery",
 Nymphea : ["../nymphea/nymphea.v_0.0.0.js",'default'], //подключение моих вп модулей
 _ : "underscore"
 }),
 */


import COMPONENT  from './class/component.class.jsx';

import INPUT  from './component/input/input.jsx';

require("./style/default_style.less");
class nymphea_ui {

}

const NYMPHEA_UI = new nymphea_ui();
NYMPHEA_UI.COMPONENT   = COMPONENT;
NYMPHEA_UI.INPUT       = {
    input:INPUT
};



/*ReactDom.render(
    React.createElement(INPUT,{
        placeholder:"placeholder",
        label:"label",
        popupLabel:"popupLabel"
    }),
    document.getElementById("page"),
    function(obj){

    }
)*/

export default NYMPHEA_UI