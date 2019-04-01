'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./checkbox.less");
/* props:
 * toggle = true||false default false , обчная галка или переключатель
 * placeholder   = "placeholder" || ""
 * label         = "label value" || ""
 * labelPosition = "left" || "right"        default "left"
 * popupLabel    = "label value" || "" //всплывающая подсказка
 * popupLabelPosition =    default "top center"
 * checkEmpty    = true || false
 * clickToLabel  = true || false  default false
 *
 * onBlur = fnc
 * onChange = fnc
 * */

/*state
 * disabled =
 * error =
 * popupError = "label value" || "" //
 * value
 * */

export default class CHECKBOX extends COMPONENT {
    constructor(props = {}){
        super();

        this.CONSTVIEW = {
            name:"dateTime",
            mainClass: DependencyUI.dateTime().mainClass,
            formField: DependencyUI.dateTime().formField,
        };

        this.onChange       = this.onChange.bind(this);
        this.mainClass      = this.mainClass.bind(this);

        this.state = {
            error       :false,
            disabled    :false,
            popupError  :false,
            value       :""
        }
    }
    componentDidMount(){
        let self = this;
        this.calendar = $(this.refs.datetime).calendar({
            ampm: false,
            type: self.props.typeDate  || "datetime",
            onChange:function(date , text , mode){
                if(self.props.onChange){
                    self.props.onChange({date:date,text:text,key_value:self.props.key_value})
                }
            },
            onHidden:function(e , text , mode){
                let error = false
                if(self.props.checkEmpty && !self.calendar.calendar('get date')){
                    error = true
                }
                self.setState({error:error});
            }
        });
        $(this.refs.editor).blur(function(e){
            if(self.props.onBlur)self.props.onBlur(e)
        })
    }
    onChange(e){
        let error = false;
        let val = this.state.value? false : true;
        if(!val && this.props.checkEmpty){
            error = true
        }
        this.setState({value:val,error:error});
        if(this.props.onChange)this.props.onChange({value:val,error:error,key_value:this.props.key_value});
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+ this.CONSTVIEW.mainClass;
        if(this.state.disabled){
            cssClass += " disabled ";
        }
        if(this.state.error){
            cssClass += " error ";
        }
        if(this.props.label){
            let labelPosition = this.props.labelPosition || "left";
            cssClass += " have_"+this.CONSTVIEW.name+"_label_"+labelPosition+" ";
        }
        if(this.state.popupError){
            cssClass += " have_"+this.CONSTVIEW.name+"_popupError ";
        }
        if(this.props.toggle){
            cssClass += this.CONSTVIEW.toggleType
        }
        return cssClass
    }
    setData(props){
        if(props.value != undefined) this.setState({value:props.value})
    }
    render(){
        let self = this;


        let labelPosition = this.props.labelPosition || "left"
        let classLabel = " nymphea_"+this.CONSTVIEW.name+"__label "+ labelPosition;


        let classInput__field = " nymphea_"+this.CONSTVIEW.name+"__field ";

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = " nymphea_"+this.CONSTVIEW.name+"__popup_label " + popupLabelPosition;

        let input;
        let label;
        let popupError;

        if(this.state.error){
            classInput__field += " error ";
        }
        if(this.props.label){
            label= [<label key="label" className={classLabel}>{this.props.label}</label>]
        }
        if(this.state.popupError){
            popupError = [ <div key="popupError" key="popupError" className="nymphea_input__popup_error ui pointing red basic label">
                {this.state.popupError}
            </div>]
        }
        if(this.props.clickToLabel){
            input = [<input type="checkbox" key="checkboxhidden" name="public" tabIndex="0" className="hidden" checked={this.state.value} onChange={this.onChange}  />]
            label= [<label key="label" className={classLabel} onClick={this.onChange} >{this.props.label}</label>]
        }else{
            input = [<input type="checkbox" key="checkbox" name="public" checked={this.state.value} onChange={this.onChange}  />]
        }
        return(
            <div className={this.mainClass()}>
                {label}
                <div className={classInput__field} >
                    <div ref="datetime"  className=={classInput__popup_label} "ui calendar"  data-tooltip={self.props.popupLabel} data-position={self.props.popupLabelPosition || "bottom right"}>
                        <div className={classInput} >
                            {this.props.typeDate == "time" ? <i className="time icon"></i> : <i className="calendar icon"></i>}
                            <input type="text" placeholder="Date/Time"  />
                        </div>
                    </div>

                    {popupError}
                </div>
            </div>
        )
    }
}