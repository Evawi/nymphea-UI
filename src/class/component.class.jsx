'use strict';
import React from 'react';

export default class Component extends React.Component {
    constructor(props = {}){
        super();
        this.setDefault    = this.setDefault.bind(this);
        this.setData       = this.setData.bind(this);
        this.getData       = this.getData.bind(this);
        this.getRefs       = this.getRefs.bind(this);

        this.state = {
            list:[]
        }
    }
    setDefault(){

    }
    setData(props){
        this.setState(props);
    }
    getData(){
        return this.state
    }
    getRefs(){
        return this.refs;
    }
    render(){
        return (
            <div ref="Component" className="component"></div>
        )
    }
}
