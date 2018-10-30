'use strict';
import INPUT  from './input.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
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
 * active        = "btn" || "dblClick" || "click"  default "click"
 *
 * onBlur = fnc
 * onChange = fnc
 * onOk = fnc   - обработчик успешного редакитрования (напр. нажатия кнопки enter)
 * onCancel = fnc - обработчик отмены редактирования
 * */

/*state
 * disabled =
 * error =
 * popupError = "label value" || "" //
 * value
 * */
export default class INPUTCLICKEdit extends INPUT {
    constructor(props = {}){
        super();

        this.CONSTVIEW = {
            name:"input_click_edit",
            mainClass: DependencyUI.inputClickEdit().mainClass
        };
        this.activated                  = this.activated.bind(this);
        this.deactivated                = this.deactivated.bind(this);
        this.ok                         = this.ok.bind(this);
        this.cancel                     = this.cancel.bind(this);
        this.additionallyMainClass      = this.additionallyMainClass.bind(this);

        this.state = {
            error       :false,
            disabled    :false,
            popupError  :false,
            value       :"",
            editable    :false
        }
    }
    componentDidMount(){
        let self = this;
        $(this.refs.editor).blur(function(e){
            if(self.props.onBlur)self.props.onBlur(e)
        });
        let onFieldActivated = function(){
            $(self.refs.editor).blur(function(e){
                if(self.props.onBlur)self.props.onBlur(e)
            });
            $(self.refs.editor).keyup(function(e) {
                if(e.which == 13) {
                    self.ok();
                    $(self.refs.editor).blur();
                }
                if (e.which == 27){
                    self.cancel();
                    $(self.refs.editor).blur();
                }
            });
        }
        let activeType = this.props.active || "click";

        if(activeType == "dblClick"){
            $(this.refs.classInput__popup).dblclick(function(e){
                self.activated();
                $(self.refs.editor).focus();
            });
            onFieldActivated();
        }
        if(activeType == "click"){
            $(this.refs.classInput__popup).click(function(e){
                self.activated();
                $(self.refs.editor).focus();
            });
            onFieldActivated();
        }
    }
    activated(){
        this.setState({editable:true});
    }
    deactivated(){
        this.setState({editable:false});
    }
    ok(){
        this.deactivated();
        if(this.props.onOk)this.props.onOk();
    }
    cancel(){
        this.deactivated();
        if(this.props.onCancel)this.props.onCancel();
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
        let self = this;

        let label;
        let labelPosition = this.props.labelPosition || "left";
        let classLabel = " nymphea_input__label "+ labelPosition;

        let classInput__field = " nymphea_input__field " + DependencyUI.inputClickEdit().formField;

        let popupLabelPosition = this.props.popupLabelPosition || " bottom center ";
        let classInput__popup_label = " nymphea_input__popup_label " + popupLabelPosition;

        let popupError;

        let activeType = this.props.active || "dblClick";
        let activatedBtn;

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

        if(activeType == "btn"){
            if(this.state.editable){
                activatedBtn = [<div className="nymphea_input__btn_activated active" >
                    <div className="ok" data-tooltip="OK" data-position={self.props.popupLabelPosition || "bottom right"} onClick={this.ok}><i className={DependencyUI.inputClickEdit().iconCheck}></i> </div>
                    <div className="cancel" data-tooltip="Отмена" data-position={self.props.popupLabelPosition || "bottom right"} onClick={this.cancel}><i className={DependencyUI.inputClickEdit().iconCancel}></i> </div>
                </div>]
            }else{
                activatedBtn = [<div className="nymphea_input__btn_activated no_active" onClick={this.activated}> <i className={DependencyUI.inputClickEdit().iconEdit}></i></div>]
            }
        }
        return(
            <div className={this.additionallyMainClass()}>
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
                {activatedBtn}
            </div>
        )
    }
}