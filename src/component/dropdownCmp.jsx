'use strict';

import React from 'react';

export default class dropdownCMP extends React.Component {
    constructor(props){
        super();
        this.setDisabled = this.setDisabled.bind(this);
        this.selected = "";
        this.state={
            onEdit:false,
            error:false,
            disabled:false
        }
        this.isSetDef=false;
    }
    formater(){
        var list = this.props.list;
        if(_.isArray(this.props.list)|| _.isObject(this.props.list)){
            if(!_.isObject(this.props.list[0])){
                list=[];
                for(var i in this.props.list){
                    list.push({id:this.props.list[i],name:this.props.list[i]})

                }
            }
        };
        var selectInList = _.findWhere(list, {id:this.props.select})
        if(!this.props.dontAddSelectInlist){
            if(!selectInList){
                list.push({id:this.props.select,name:this.props.select})
            }
        }
        return list
    }
    componentDidMount(){
        var self = this;
        var props={};
        if(self.props.allowAdditions) props.allowAdditions=true;
        $(this.refs.dropdown).dropdown({
            allowAdditions: true
        });
        if(this.props.onChange)       {
            $(this.refs.dropdown).dropdown('setting', 'onChange', function(a,b){
                if(!self.isSetDef)self.props.onChange({id:a,value:b})

            });
        }
        if(this.props.floatingLabel)$('.floating.ui.label').popup()
    }
    setList(list){
        this.props.list = list;
        this.setState({onEdit:true});
    }
    clear(){
        $(this.refs.dropdown).dropdown('clear');
    }
    getData(){
        return {id:$(this.refs.dropdown.getDOMNode()).val()}
    }
    setDefaultValue(val){
        this.isSetDef = true;
        $(this.refs.dropdown).dropdown('set selected', val);
        this.isSetDef = false;
    }
    setDisabled(disabled){
        this.setState({disabled:disabled})
    }
    render(){
        var formater=this.formater();
        var self = this;
        let classDropdown = " ui selection dropdown "
        if(this.state.disabled) classDropdown += " disabled ";

        return(
            <div className={this.props.error?"my dropdown__wrapper error":"my dropdown__wrapper"}>
                {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                {this.props.floatingLabel?
                    <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                        <i className="info circle icon"></i>
                    </div>
                    :null}
                <div className={classDropdown} ref="dropdown">
                    <input name="gender" type="hidden" value={this.props.select||""} ref="ddinput"/>
                        <i className="dropdown icon"></i>
                        <div className="text">{this.props.placeholder||"Default Value"}</div>
                        <div className="menu">
                            {formater.map(function(item){
                                item = self.props.itsModel? item.attributes : item;
                                return <div className="item" key={item.id} data-value={item.id} data-name={item.name}>{item.name}</div>
                            })}
                            {this.props.noSelect?<div className="item" key="js_empty" data-value="js_empty" data-name="js_empty">No selected...</div>:null}
                        </div>
                </div>
            </div>
        )
    }
}


