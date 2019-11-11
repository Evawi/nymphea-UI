'use strict';

/********************
 * only DX depency  *
 * only MU style  *
 ********************/

import COMPONENT     from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./tooltip.less");


/* props:
 * key_value        = "some key" опознавательный ключ, отправляется при onClick
 * target           = ref or "#id" элемент к которому будет прикреплена подсказка
 * position         = default "bottom"
 * text             = ""
 * contentTemplate  = default false || data.html("")  // используется если необходимо добавить кастомизацию в тултип
 * closeOnOutsideClick = default false || true   //закрывать по клику снаружи
 * class            = "btn_class" || "" //дополниельный стиль
 * */

/*state
 * error           =
 * text            = "label value" || "" //всплывающая подсказка
 * class           = "name_class" ||"" //дополнительный стиль добавляется к props.class
 * */


export default class TOOLTIP extends COMPONENT {
    constructor(props){
        super(props);

        this.setDisabled        = this.setDisabled.bind(this);
        this.setContentTemplate = this.setContentTemplate.bind(this);
        this.CONSTVIEW = {
            name:"tooltip",
            mainClass: " tooltip"
        };
        this.state={
            useDisabled        :props.disabled?true:false ,
            useContentTemplate :props.contentTemplate?true:false ,
            text               :props.text || "",
            error              :false,
            class              :"",

        }
    }
    componentDidMount(){
        let self = this;
        let props = {
            target: self.props.target,
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            closeOnOutsideClick: self.props.closeOnOutsideClick||false,
            position: self.props.position || "bottom"
        }
        if(self.props.contentTemplate)       props.contentTemplate = self.props.contentTemplate;
        if(_.isBoolean(self.props.disabled)) props.disabled        = self.props.disabled;

        self.tooltip = new DependencyUI.Tooltip($(this.refs.tooltip),props).instance();
    }
    setDisabled(disabled){
        this.tooltip.option("disabled",disabled);
        this.setState({useDisabled:disabled});
        this.tooltip.repaint();
    }
    setContentTemplate(contentTemplate){
        this.tooltip.option("contentTemplate",contentTemplate);
        this.setState({useContentTemplate:contentTemplate?true:false});
        this.tooltip.repaint();
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+ this.CONSTVIEW.mainClass;
        if(this.state.useDisabled){
            cssClass += " disabled ";
        }
        if(this.state.useContentTemplate){
            cssClass += " template ";
        }
        if(this.state.error){
            cssClass += " error ";
        }
        if(this.props.class){
            cssClass += " "+this.props.class+" ";
        }
        if(this.state.class){
            cssClass += " "+this.state.class+" ";
        }
        return cssClass
    }
    render(){
        return(
            <div ref="tooltip" className="nya_js_selector_tooltip" className={this.mainClass()} >{this.state.text}</div>
        )
    }
}