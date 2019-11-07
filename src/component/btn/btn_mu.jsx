'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
import Tooltip  from '../tooltip/tooltip.jsx';
require("./btn.less");

/* props:
 * key_value = "some key" опознавательный ключ, отправляется при onClick
 * subClass = "" || "outline" || "raised" //MU классы
 * class = "btn_class" || "" //дополниельный стиль для кнопки
 *
 *
 * popupLabel    = "label value" || "" //всплывающая подсказка
 * popupLabelPosition =    default "bottom right"
 * popupErrorPosition =  default ""  //"" || "below" || "left" || "right"  //позиция ошибки
 *
 * onClick = fnc
 * name=""//изначально берется отсуюда, в дальнейшем может быть изменено через state
 * icon = "name icon" ||""  //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * disabled = //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * */

/*state
 * disabled =
 * error =
 * popupLabel=""
 * popupError = "label value" || "" //
 * name = "name btn" || "" //если есть, добавит на кнопку название
 * icon = "name icon" ||"" //если есть будет рисовать иконку в названии перекрывает props.icon
 * class= "name_class" ||"" //дополнительный стиль для кноки добавляется к props.class
 * */


export default class BTN_MU extends COMPONENT {
    constructor(props){
        super(props);

        this.CONSTVIEW = {
            name:" button ",
            mainClass: " mdc-button ",
            outline:" mdc-button--outlined ",
            raised:" mdc-button--raised ",
        };
        this.onClick          = this.onClick.bind(this);
        this.onClickWr        = this.onClickWr.bind(this);
        this.state={
            error       :props.error  || false,
            showPopupError:props.showPopupError  || false,
            popupError  :props.popupError  || false ,

            popupLabel  :props.popupLabel  || false ,

            disabled    :props.disabled || false ,
            name        :props.name,
            icon        :props.icon || "",
            class:      "",
            tooltip     :""
        }
    }
    componentDidMount(){
        let self = this;
        $(this.refs.btn).click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            self.onClick(event)
        })
        if(this.state.popupLabel){
            this.setState({tooltip:<Tooltip text={this.state.popupLabel} position={this.props.popupLabelPosition} target={this.refs.btn} />})
        }
    }
    onClick(event){

        if(this.state.disable) return;
        this.props.onClick({key_value:this.props.key_value},event)
    }
    onClickWr(){
        let self = this;
        if(this.state.popupError && !this.state.showPopupError){
            this.setState({showPopupError:true});
            let intervalID = setInterval(function(){
                self.setState({showPopupError:false});
                clearInterval(intervalID);
            }, 1500);
            return
        }
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name;
        if(this.state.disabled){
            cssClass += " disabled ";
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
        if(this.state.popupError){
            cssClass += " have_"+this.CONSTVIEW.name+"_popupError ";
        }
        return cssClass
    }
    elementClass(){
        let cssClass = " gl_btn "+this.CONSTVIEW.mainClass;
        switch (this.props.subClass){
            case "outline":  cssClass += this.CONSTVIEW.outline; break;
            case "raised":   cssClass += this.CONSTVIEW.raised; break;
            default:         cssClass = cssClass; break;
    }

        return cssClass
    }
    render(){
        let disabled = false
        if(this.state.disabled){
            disabled = true
        }
        let icon;
        if(this.state.icon){
            icon = <i className="material-icons mdc-button__icon" aria-hidden="true">{this.state.icon}</i>
        }
        let label;
        if(this.state.name){
            label = <span className="mdc-button__label">{this.state.name}</span>
        }
        return(
            <div className={this.mainClass()} onClick={this.onClickWr} ref="btn_wrapper">
                <button className={this.elementClass()} onClick={this.onClick} ref="btn" disabled={disabled} >
                    {icon}{label}
                </button>
                {this.state.tooltip}
            </div>
        )
    }
}