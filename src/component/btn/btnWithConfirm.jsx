'use strict';
import BTN  from './btn.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./btn.less");

/* props:
 * popupLabel    = "label value" || "" //всплывающая подсказка
 * popupLabelPosition =    default "bottom right"
 * class = "btn_class" || "" //дополниельный стиль для кнопки
 * onClick = fnc
 * modalHeader="" // текст заголовка
 * modalOkBtn = "" //текст кнопки подтверждения
 *
 * name=""//изначально берется отсуюда, в дальнейшем может быть изменено через state
 * icon = "name icon" ||""  //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * disabled = //изначально берется отсуюда, в дальнейшем может быть изменено через state
 * */

/*state
 * disabled =
 * error =
 * popupError = "label value" || "" //
 * name = "name btn" || "" //если есть, добавит на кнопку название
 * icon = "name icon" ||"" //если есть будет рисовать иконку в названии
 * modalDescription = {description:["str"],other:[{key:"key",value:"value"}]}   //description разбивается как: каждый элемент - отдельный <p> ;
 *                                                                                other : key - label , value - текст
 * */


export default class BTNWithConfirm extends BTN {
    constructor(props){
        super(props);

        this.CONSTVIEW = {
            name:"btnWithConfirm",
            mainClass: DependencyUI.btnWithConfirm().mainClass
        };

        this.additionallyMainClass = this.additionallyMainClass.bind(this);
        this.open = this.open.bind(this);
        this.modalDescrProcess = this.modalDescrProcess.bind(this);
        this.state={
            error       :false,
            disabled    :props.disabled || false ,
            showPopupError:false,
            popupError  :false,
            name        :props.name,
            icon        :props.icon || "",
            modalDescription:{}
        }
    }
    componentDidMount(){
        $(this.refs.modal).modal({
            closable  : false,
            allowMultiple: true
        })
    }
    open(){
        $(this.refs.modal).modal('show');
    }
    modalDescrProcess(){
        if(_.isEmpty(this.state.modalDescription)){
            return <div className="description"></div>
        }
        let descr = [];
        let other = [];
        if(_.isEmpty(this.state.modalDescription.description)){
            descr = [];
        }else{
            _.each(this.state.modalDescription.description,function(node,key){
                descr.push( <p key={key}>{node}</p>)
            })
        }
        if(_.isEmpty(this.state.modalDescription.other)){
            other = [];
        }else{
            _.each(this.state.modalDescription.other,function(node,key){
                other.push( <div className="item" key={"item"+key}>  <div className="ui horizontal label">{node.key}</div> {node.value}</div>)
            })
        }
        let processed = descr.concat(other);
        return <div className="description"> {processed}</div>
    }
    additionallyMainClass(){
        let cssClass = this.mainClass();
        let activeType = this.props.active || "click";
        cssClass += " active_type_"+ activeType +" ";

        if(this.state.editable){
            cssClass += " editable_active ";
        }
        return cssClass
    }
    render(){
        let classBtn__field = " nymphea_"+this.CONSTVIEW.name+"__field " + DependencyUI.btnWithConfirm().btnClass;
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
            popupError = [ <div key="popupError" className={"nymphea_"+this.CONSTVIEW.name+"__popup_error ui pointing red basic label"}>
                {this.state.popupError}
            </div>]
        }


        return(
            <div className={this.additionallyMainClass()} onClick={this.onClickWr}>
                <div className={classInput__popup_label} data-tooltip={this.props.popupLabel} data-position={this.props.popupLabelPosition || "bottom right"}>
                    <div className={classBtn__field} onClick={this.state.disable?null:this.open}  >
                        {icon} {this.state.name}
                    </div>
                </div>
                {popupError}
                <div className="ui mini modal" ref="modal">
                    <div className="header">{this.props.modalHeader}</div>
                    <div className="image content">
                        <div className="image">
                            <i className="icon help circle outline"></i>
                        </div>
                        {this.modalDescrProcess()}
                    </div>
                    <div className="actions">
                        <div className="ui approve button" >Отмена</div>
                        <div className="ui cancel button" onClick={this.onClick}>{this.props.modalOkBtn}</div>
                    </div>
                </div>
            </div>
        )
    }
}