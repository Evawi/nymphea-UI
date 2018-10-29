'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./input.less");
/* props:
* type          = "number" || "text"    default "text"
* placeholder   = "placeholder" || ""
* maxlength     = 100 || ""
* pattern       = some pattern || ""
* label         = "label value" || ""
* labelPosition = "left" || "top"        default "left"
* popupLabel    = "label value" || "" //всплывающая подсказка
* popupLabelPosition =    default "top center"
* checkEmpty    = true || false
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

export default class INPUT extends COMPONENT {
    constructor(props = {}){
        super();

        this.CONSTVIEW = {
            name:"input"
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
        $(this.refs.editor).blur(function(e){
            if(self.props.onBlur)self.props.onBlur(e)
        })
    }
    checkNumber(str){
        var toNumberRegXep = /[^a-zA-Zа-яА-Я_|]/;
        var test = toNumberRegXep.test(str);
        return test
    }
    onChange(e){
        let error = false
        if(!e.target.value && this.props.checkEmpty){
            error = true
        }
        if(this.props.type == "number") {
            if(this.checkNumber(e.target.value) || !e.target.value){
                this.setState({value:e.target.value,error:error});
            }else{
                error = true;
                this.setState({error:error});
            }
        }else{
            this.setState({value:e.target.value,error:error});
        }
        if(this.props.onChange)this.props.onChange({value:e.target.value,key_value:this.props.key_value});
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+ DependencyUI.input().mainClass;
        if(this.state.disabled){
            cssClass += " disabled ";
        }
        if(this.state.error){
            cssClass += " error ";
        }
        if(this.props.label){
            let labelPosition = this.props.labelPosition || "left"
            cssClass += " have_"+this.CONSTVIEW.name+"_label_"+labelPosition+" ";
        }
        if(this.state.popupError){
            cssClass += " have_"+this.CONSTVIEW.name+"_popupError ";
        }
        return cssClass
    }
    render(){
        let self = this;

        let label;
        let labelPosition = this.props.labelPosition || "left"
        let classLabel = " nymphea_input__label "+ labelPosition;

        let classInput__field = " nymphea_input__field " + DependencyUI.input().formField;

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = " nymphea_input__popup_label " + popupLabelPosition;

        let popupError;

        var type = this.props.type;

        if(this.state.error){
            classInput__field += " error ";
        }

        if(this.props.label){
            label= [<label key="label" className={classLabel}>{this.props.label}</label>]
        }

        if(this.state.popupError){
            popupError = [ <div key="popupError" className="nymphea_input__popup_error ui pointing red basic label">
                                {this.state.popupError}
                            </div>]
        }

        if(this.props.type == "number"){
            type = "text"
        }
        return(
            <div className={this.mainClass()}>
                {label}
                <div className={classInput__field} >
                    <div ref="classInput__popup" className={classInput__popup_label} data-tooltip={self.props.popupLabel} data-position={self.props.popupLabelPosition || "bottom right"} >
                        <input
                            className="nymphea_input__element"
                            ref="editor"
                            min={this.props.min ||""}
                            max={this.props.max ||""}
                            type={type ||"text"}
                            title={this.props.title ||""}
                            pattern={this.props.pattern ||""}
                            maxLength = {this.props.maxlength ||""}
                            placeholder={this.props.placeholder?this.props.placeholder:this.props.label||""}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div>
                    {popupError}
                </div>
            </div>
        )
    }
}