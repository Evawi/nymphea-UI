'use strict';

import React from 'react';
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js';

require("jsoneditor/dist/jsoneditor.min.css");

export default class JSONEditorCmp extends React.Component {
    constructor(props){
        super();
        this.setText    = this.setText.bind(this);
        this.getText    = this.getText.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.state = {
            text:""
        }
    }
    componentDidMount(){
        var self=this;

        var container = this.refs.jsoneditor;
        var options = {
            onChange:function(a,b,c){
                if(self.props.onChange)self.props.onChange(self.editor.get())
            }
        };
        this.editor = new JSONEditor(container, options);
    }
    setText(config){
        this.editor.setValue(config || "", null, '\t');
    }
    getError(){
        return {}
    }
    getText(){
        return this.editor.get()
    }
    setDefault(config){
        if(_.isString(config))config = JSON.parse(config)
        this.editor.set(config); //json

    }
    render(){
        return (
            <div ref="jsoneditor" className="jsoneditor"></div>
        )
    }
}
