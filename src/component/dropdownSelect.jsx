'use strict';


import React from 'react';


export default class dropdownSelect extends React.Component {
    constructor(props){
        super();
        this.selected = "";
        this.setDisabled = this.setDisabled.bind(this);
        this.setList     = this.setList.bind(this);
        this.state={
            onEdit:false,
            error:false,
            disabled:false
        }
    }
    componentDidMount(){
        var self = this;
        var props={};
        if(self.props.allowAdditions) props.allowAdditions=true;
        $(this.refs.dropdown).dropdown(props);
        if(this.props.onChange)       {
            $(this.refs.dropdown).dropdown({
                onChange: function(value, text, $selectedItem) {
                    self.props.onChange({id:value ,value:text, componentName:self.props.componentName})
                }
            })
        }
        if(this.props.floatingLabel)$('.floating.ui.label').popup()
    }
    setList(list){
        let self = this;
        if(_.isArray(list)){
            $(self.refs.dropdown).dropdown('change values',list)
            $(self.refs.dropdown).dropdown('refresh')
        }
    }
    clear(){
        $(this.refs.dropdown).dropdown('clear');
    }
    getData(){
        return {id:$(this.refs.dropdown.getDOMNode()).val()}
    }
    setDefaultValue(val){
        $(this.refs.dropdown).dropdown('set exactly', [val]);
        $(this.refs.dropdown).dropdown('refresh');
    }
    setDisabled(disabled){
        this.setState({disabled:disabled})
    }
    render(){
        var self = this;
        let classDropdown = " ui fluid search selection dropdown "
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
                        <i className="dropdown icon"></i>
                        <div className="default text">Select any value</div>
                </div>
            </div>
        )
    }
}


