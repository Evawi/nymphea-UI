'use strict';
import React from 'react';
/*
 <div id="tooltip1">ExcelRemote IR</div>
$("#tooltip1").dxTooltip({
 target: "#product1",
 showEvent: "mouseenter",
 hideEvent: "mouseleave"
 });*/

/******** props
 * hover         = true||false                                             // default:false            //включает отключает подсказки
 * hoverPosition = "top left" || "top center" || "top right" ||
 *                 "bottom left" || "bottom center" || "bottom right" ||   // default:"top center"     //позиция подсказки  текста
 *                 "right center" || "left center"
 * hoverContent  = " "                                                     // default:"Click to edit"  //текст подсказки текста
 * **value        = name
 * **save        = function(attr,cb){} //  cb(onSave){} // onSave ="false"||"success"||"error"
 *
 *
 */


export default class DblClickEdit extends React.Component {
    constructor(props){
        super(props);
        this.state={
            onEdit:false,
            onSave:false,
            value:props.value
        }
        this.editSwitch = this.editSwitch.bind(this);
        this.save       = this.save.bind(this);
        this.getData    = this.getData.bind(this);
    }
    editSwitch(state){
        this.setState({onEdit:state,onSave:false});
    }
    save(){
        if(!this.refs.editor.value){
            this.setState({onEdit:false,onSave:"error"});
            return
        }
        var self = this;
        if(this.state.onEdit && this.props.save){
            this.props.save ({value:this.refs.editor.value,key:this.props.key_value},function(onSave){
                self.setState({
                    onEdit:false,
                    onSave:onSave||false,
                    value:self.refs.editor.value
                });
            });
        }
    }
    getData(){
        return this.state.value
    }
    componentWillReceiveProps(props){
        this.state.value=props.value;
    }
    componentDidUpdate(){
        if(this.state.onEdit ){
            var self = this;
            var editor = $(this.refs.editor);
            editor.focus();
            editor.blur(function(e){
                self.save();
            });
            editor.keyup(function(e) {
                if(e.which == 13) {
                    self.save();
                }
                if (e.which == 27){
                    self.setState({onEdit:false,onSave:false});
                }
            });
        }
    }
    render(){
        return(
            <div className="my dbl-click-input">
                {this.state.onEdit?
                    <div className="ui input field">
                        {this.props.label? <label className="lebel-field on-edit">{this.props.label}</label>:null}
                        <input type="text" ref="editor" placeholder="value" defaultValue={this.state.value} />
                    </div>
                    :
                    <div className="ui icon input field" onClick={this.editSwitch.bind(null,true)} data-tooltip="Click to edit" data-position="bottom right" >
                        {this.props.label? <label className="lebel-field on-label">{this.props.label}</label>:null}
                        <p ref="label" className="no-edit-field" data-content="Click to edit" data-position={this.props.hoverPosition || "top center" }> {this.state.value || "empty"} </p>
                        {(() => {
                            switch (this.state.onSave) {
                                case "success":    return <i className="edit-icon large icons success" data-content={"Edit successfully" } data-position={ "top right" }>
                                    <i className="edit icon"></i>
                                    <i className="corner positive checkmark icon"></i>
                                </i>;
                                case "error":    return <i className="edit-icon large icons error" data-content={"Edit error"} data-position={ "top right" }>
                                    <i className="edit icon"></i>
                                    <i className="corner negative remove icon"></i>
                                </i>;
                                default: return <i className="edit-icon edit large icon"></i>
                            }
                        })()}
                    </div>
                }
            </div>
        )
    }
}
