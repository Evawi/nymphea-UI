'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
require("./dropdown.less");

//props
//notSearch - если true убирает поле ввода из dropdown

export default class DROPDOWN extends COMPONENT {
    constructor(props){
        super();
        this.selected = "";
        this.setDisabled = this.setDisabled.bind(this);
        this.setList     = this.setList.bind(this);
        this.setDefaultValue     = this.setDefaultValue.bind(this);
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
       // $(this.refs.dropdown).dropdown('set exactly', [val]);
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
        // $(this.refs.dropdown).dropdown('set exactly', [val]);
       // $(this.refs.dropdown).dropdown('refresh');
    }
    setDisabled(disabled){
        this.setState({disabled:disabled})
    }
    render(){
        var self = this;
        let ddIcon = [<i key="ddicon" className="dropdown icon"></i>]
        let classDropdown = " ui fluid search selection dropdown ";
        if(this.props.notSearch)  {
            classDropdown = "ui dropdown label ";

        }
        if(this.state.disabled) classDropdown += " disabled ";

        return(
            <div className={this.props.error?"my dropdown__wrapper error":"my dropdown__wrapper"}>
                {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                {this.props.floatingLabel?
                    <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                        <i className="info circle icon"></i>
                    </div>
                    :null}
                <div className={classDropdown}  ref="dropdown">
                    <input type="hidden" />
                    {this.props.notSearch? null:ddIcon}
                    <div className="default text">Select any value</div>
                    {this.props.notSearch? ddIcon:null}
                </div>
            </div>
        )
    }
}


