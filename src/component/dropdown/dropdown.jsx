'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./dropdown.less");

/* props:
 * notSearch - если true убирает поле ввода из dropdown
 * placeholder   = "placeholder" || ""
 * label         = "label value" || ""
 * labelPosition = "left" || "top"        default "left"
 * popupLabel    = "label value" || "" //всплывающая подсказка
 * popupLabelPosition =    default "top center"
 * floatingLabel = "" //дополнительный label
 * floatingLabelPosition = "top center"
 * onChange = fnc
 * */

/*state
 * label =
 * disabled =
 * error =
 * popupError = "label value" || "" //
 * value
 * */

export default class DROPDOWN extends COMPONENT {
    constructor(props){
        super();
        this.selected = "";
        this.setDisabled = this.setDisabled.bind(this);
        this.setList     = this.setList.bind(this);
        this.setDefaultValue     = this.setDefaultValue.bind(this);
        this.CONSTVIEW = {
            name:"dropdown",
        };

        this.state={
            onEdit:false,
            error:false,
            disabled:false
        }
        this.dontCallOnChange = false;
    }
    componentDidMount(){
        var self = this;
        var props={};
        if(self.props.allowAdditions) props.allowAdditions=true;
        $(this.refs.dropdown).dropdown(props);
        if(this.props.onChange)       {
            $(this.refs.dropdown).dropdown({
                onChange: function(value, text, $selectedItem) {
                    if(!self.dontCallOnChange)self.props.onChange({id:value ,value:text, key_value:self.props.key_value})
                }
            })
        }
        if(this.props.floatingLabel)$('.floating.ui.label').popup()
    }
    setList(list){
        let self = this;
        if(_.isArray(list)){
            _.each(list,function(node,key){
                if(_.isNumber(node.value) && node.value==0){
                    list[key].value = node.value+""
                }
            });
            this.dontCallOnChange = true;
            $(self.refs.dropdown).dropdown('change values',list);
            $(self.refs.dropdown).dropdown('refresh');
            this.dontCallOnChange = false;
        }
    }
    clear(){
        $(this.refs.dropdown).dropdown('clear');
    }
    getData(){
        var val =  $(this.refs.dropdown).dropdown('get value');
        return val
    }
    setDefaultValue(val){
        $(this.refs.dropdown).dropdown('set exactly', val); //отправляй value
        $(this.refs.dropdown).dropdown('refresh');
    }
    setData(props){
        this.dontCallOnChange = true;
        let val = props.value;
        if(_.isNumber(props.value) && props.value==0){
            val = props.value+""
        }
        $(this.refs.dropdown).dropdown('set exactly', val); //отправляй value
        $(this.refs.dropdown).dropdown('refresh');
        this.dontCallOnChange = false;
    }
    setDisabled(disabled){
        this.setState({disabled:disabled})
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+DependencyUI[this.CONSTVIEW.name]().mainClass;

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
    fieldClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+"__field " ;
        if(this.props.notSearch)  {
            cssClass += DependencyUI[this.CONSTVIEW.name]().mainField;
        }else{
            cssClass += DependencyUI[this.CONSTVIEW.name]().searchField;
        }
        if(this.state.disabled) cssClass += " disabled ";
        if(this.state.error)    cssClass += " error ";
        return cssClass
    }
    render(){
        var self = this;
        let ddIcon = [<i key="ddicon" className="dropdown icon"></i>]
        let label;
        let labelPosition = this.props.labelPosition || "left"
        let classLabel = " nymphea_input__label "+ labelPosition;
        let popupError;

        if(this.state.label || this.props.label){
            label= [<label key="label" className={classLabel}>{this.state.label || this.props.label}</label>]
        }
        if(this.state.popupError){
            popupError = [ <div key="popupError" className="nymphea_input__popup_error ui pointing red basic label">
                {this.state.popupError}
            </div>]
        }

        return(
            <div className={this.mainClass()}>
                {label}
                {this.props.floatingLabel?
                    <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.floatingLabelPosition || "top center" }>
                        <i className="info circle icon"></i>
                    </div>
                    :null}
                <div className={this.fieldClass()}  ref="dropdown">
                    <input type="hidden" />
                    {this.props.notSearch? null:ddIcon}
                    <div className="default text">{this.props.placeholder}</div>
                    {this.props.notSearch? ddIcon:null}
                </div>
                {popupError}
            </div>
        )
    }
}


