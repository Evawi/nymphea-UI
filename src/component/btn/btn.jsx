'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./btn.less");

/* props:
 * key_value = "some key" опознавательный ключ, отправляется при onClick
 * popupLabel    = "label value" || "" //всплывающая подсказка
 * popupLabelPosition =    default "bottom right"
 * popupErrorPosition =  default ""  //"" || "below" || "left" || "right"  //позиция ошибки
 * class = "btn_class" || "" //дополниельный стиль для кнопки
 * onClick = fnc
 * name=""//изначально берется отсуюда, в дальнейшем может быть изменено через state
 * icon = "name icon" ||""  //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * disabled = //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * */

/*state
 * disabled =
 * error =
 * popupError = "label value" || "" //
 * name = "name btn" || "" //если есть, добавит на кнопку название
 * icon = "name icon" ||"" //если есть будет рисовать иконку в названии перекрывает props.icon
 * class= "name_class" ||"" //дополнительный стиль для кноки добавляется к props.class
 * */


export default class BTN extends COMPONENT {
    constructor(props){
        super(props);

        this.CONSTVIEW = {
            name:"button",
            mainClass: DependencyUI.btn().mainClass
        };

        this.onClick          = this.onClick.bind(this);
        this.onClickWr        = this.onClickWr.bind(this);
        this.state={
            error       :false,
            disabled    :props.disabled || false ,
            showPopupError:false,
            popupError  :false,
            name        :props.name,
            icon        :props.icon || "",
            class:      ""
        }
    }
    onClick(){
        this.props.onClick({key_value:this.props.key_value})
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
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+ this.CONSTVIEW.mainClass;
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
    render(){
        let classBtn__field = " nymphea_"+this.CONSTVIEW.name+"__field " + DependencyUI.btn().btnClass;
        if(this.state.disabled){
            classBtn__field += " disabled ";
        }
        if(this.state.error){
            classBtn__field += " error ";
        }

        let icon;
        if(this.state.icon){
            icon = <i className= {this.state.icon + " icon "}></i>
        }

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = " nymphea_"+this.CONSTVIEW.name+"__popup_label " + popupLabelPosition;
        let popupError;

        if(this.state.showPopupError){
            popupError = [ <div key="popupError" className={"nymphea_"+this.CONSTVIEW.name+"__popup_error ui pointing red basic label "+this.props.popupErrorPosition||""}>
                {this.state.popupError}
            </div>]
        }
        return(
            <div className={this.mainClass()} onClick={this.onClickWr}>
                <div className={classInput__popup_label} data-tooltip={this.props.popupLabel} data-position={this.props.popupLabelPosition || "bottom right"}>
                    <div className={classBtn__field} onClick={this.state.disable?null:this.onClick}  >
                        {icon} {this.state.name}
                    </div>
                </div>
                {popupError}
            </div>
        )
    }
}