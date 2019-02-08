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



import 'semantic-ui-css/semantic.min.js';
import 'semantic-ui-css/semantic.min.css';
*/
import DependencyUI  from './extra/checkDependencyUI.js';

import COMPONENT  from './class/component.class.jsx';

import INPUT             from './component/input/input.jsx';
import CLICKEdit         from './component/input/inputClickEdit.jsx';

import BTN         from './component/btn/btn.jsx';
import BTNWithConfirm         from './component/btn/btnWithConfirm.jsx';

import DROPDOWN         from './component/dropdown/dropdown.jsx';

import CHECKBOX from './component/checkbox/checkbox.jsx';

require("./style/default_style.less");
class nymphea_ui {

}

const NYMPHEA_UI = new nymphea_ui();
NYMPHEA_UI.COMPONENT   = COMPONENT;
NYMPHEA_UI.INPUT       = {
    base : INPUT,
    clickEdit :CLICKEdit,
};
NYMPHEA_UI.BTN={
    base : BTN,
    withConfirm : BTNWithConfirm
};
NYMPHEA_UI.DROPDOWN={
    base : DROPDOWN //IM NOT READY!!!!
};
NYMPHEA_UI.CHECKBOX={
    base : CHECKBOX //IM NOT READY!!!!
};

NYMPHEA_UI.reinit = DependencyUI.reinit;

let a = {setState:null};
let onC = function(e){
    console.log("onC",e)
    //a.setState({popupError:"error"})
}
/*
ReactDom.render(
    React.createElement(DROPDOWN,{
        popupLabel:"popupLabel",
        checkEmpty:true,
        modalOkBtn:"ok",
        modalHeader:"modalHeader",
        onChange:onC
    }),
    document.getElementById("page"),
    function(obj){
        a.setState = this.setState.bind(this);
        let descr = {
            description:["str1","str2"],
            other:[{key:"id",value:"id"},{key:"bane",value:"bane"}]

        }
        let list= [
            {id:"s" ,value:"sss",name:"sss"},
            {id:"s2" ,value:"sss333",name:"sss333"}
        ]

        this.setList(list);
        this.setDefaultValue(   "sss333")
    }
)*/

export default NYMPHEA_UI