'use strict';

import React from 'react';
import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/ext/beautify';

export default class AceCmp extends React.Component {
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

        var beautify = window.ace.require("ace/ext/beautify");
        this.editor = window.ace.edit(this.refs.codeEditor);
        this.editor.getSession();
        this.editor.$blockScrolling = Infinity;
        this.editor.setOptions({
            enableSnippets:true,
            maxLines: 100,
            minLines: 6,

        });

        if(this.props.onChange){
            this.editor.getSession().on('change', function() {
                self.props.onChange(self.editor.getValue())
            });
        }

        //this.editor.setAutoScrollEditorIntoView(true);
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.getSession().setTabSize(2);

        this.editor.setValue(this.props.config, null, '\t');
        this.editor.focus();
    }
    resize(){
        this.editor.resize(true);
    }
    setText(config){
        this.editor.setValue(config || "", null, '\t');

    }
    getError(){
        //  console.log(this.editor.getSession().getAnnotations())
        //return this.editor.getSession().getAnnotations()
        return {}
    }

    getText(){
        return this.editor.getValue()
    }
    setDefault(config){
        this.editor.setValue(config || "", null, '\t');
        window.beautify.beautify(this.editor.getSession());
    }
    render(){
        return (
            <div ref="codeEditor" className="codeEditor"></div>
        )
    }
}
