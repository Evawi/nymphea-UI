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
        this.onChange       = this.onChange.bind(this);

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
    onChange(e){
        let error = false
        if(!e.target.value && this.props.checkEmpty){
            error = true
        }
        if(this.props.type == "number") {
            var toNumberRegXep = /[^a-zA-Zа-яА-Я_|]/;
            var test = toNumberRegXep.test(e.target.value);
            if(test || !e.target.value){
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
    render(){
        let self = this;
        let classInput = " nymphea_input " + DependencyUI.input().mainClass;

        let label;
        let classLabel = " nymphea_input__label "+ this.props.labelPosition || "left";

        let classInput__field = " nymphea_input__field " + DependencyUI.input().formField;

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = " nymphea_input__popup_label " + popupLabelPosition;

        let popupError;

        var type = this.props.type;

        if(this.state.disabled){
            classInput += " disabled ";
        }
        if(this.state.error){
            classInput += " error ";
            classInput__field += " error ";
        }

        if(this.props.label){
            classInput += " input_label ";
            label= [<label key="label" className={classLabel}>{this.props.label}</label>]
        }

        if(this.props.popupLabel){
            classInput += " input_popupLabel ";
            classInput__popup_label  += " nymphea_input__popup_label " + popupLabelPosition;
        }

        if(this.state.popupError){
            classInput += " input_popupError ";
            popupError = [ <div key="popupError" className="nymphea_input__popup_error ui pointing red basic label">
                                {this.state.popupError}
                            </div>]
        }

        if(this.props.type == "number"){
            type = "text"
        }
        return(
            <div className={classInput}>
                {label}
                <div className={classInput__field} >
                    <div ref="classInput__popup" className={classInput__popup_label} data-tooltip={self.props.popupLabel} data-position={self.props.popupLabelPosition || "bottom right"} >
                        <input
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