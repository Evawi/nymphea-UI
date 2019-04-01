'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
//require("./input.less");
/* props:
 * placeholder   = "placeholder" || ""
 * rows         = 100 || ""
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
            name:"textarea",
            mainClass:DependencyUI.textarea().mainClass
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
    onChange(e){
        let error = false
        if(!e.target.value && this.props.checkEmpty){
            error = true
        }
        this.setState({value:e.target.value,error:error});
        if(this.props.onChange)this.props.onChange({value:e.target.value,error:error,key_value:this.props.key_value});
    }
    mainClass(){
        let cssClass = "nymphea nymphea_"+this.CONSTVIEW.name+" "+ this.CONSTVIEW.mainClass;
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
        return cssClass
    }
    setData(props){
        if(props.value != undefined) this.setState({value:props.value})
    }
    render(){
        let self = this;

        let label;
        let labelPosition = this.props.labelPosition || "left"
        let classLabel = "nymphea__label nymphea_"+this.CONSTVIEW.name+"__label "+ labelPosition;

        let classInput__field = "nymphea__field nymphea_"+this.CONSTVIEW.name+"__field ";

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = "nymphea__popup_label nymphea_"+this.CONSTVIEW.name+"__popup_label " + popupLabelPosition;

        let popupError;

        if(this.state.error){
            classInput__field += " error ";
        }

        if(this.props.label){
            label= [<label key="label" className={classLabel}>{this.props.label}</label>]
        }

        if(this.state.popupError){
            let errorPClass = "nymphea__popup_error  nymphea_"+this.CONSTVIEW.name+"__popup_error ui pointing red basic label";
            popupError = [ <div key="popupError" className={errorPClass}>
                {this.state.popupError}
            </div>]
        }

        return(
            <div className={this.mainClass()}>
                {label}
                <div className={classInput__field} >
                    <div ref="classInput__popup" className={classInput__popup_label} data-tooltip={self.props.popupLabel} data-position={self.props.popupLabelPosition || "bottom right"} >
                        <textarea
                            className={"nymphea_"+this.CONSTVIEW.name+"__element"}
                            ref="editor"
                            rows={this.props.rows ||""}
                            title={this.props.title ||""}
                            placeholder={this.props.placeholder||""}
                            onChange={this.onChange}
                            value= {this.state.value}
                        >

                        </textarea>
                    </div>
                    {popupError}
                </div>
            </div>
        )
    }
}