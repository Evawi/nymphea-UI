'use strict';

export default class ComponentReat extends React.Component {
    constructor(props = {}){
        super();
        this.setData       = this.setData.bind(this);
        this.getData       = this.getData.bind(this);
        this.getRefs       = this.getRefs.bind(this);

        this.state = {
            list:[]
        }
    }
    setData(props){
        _.each(this.refs,function(node,key){
            if(node.setData) node.setData({key:props[key]});
        });
    }
    getData(){
        let values={};
        let datas={};
        _.each(this.refs,function(node,key){
           if($(node).value)  values[key]= $(node).value;
           if(node.getData)   datas[key]= node.getData();
        });
        return {
            state  :this.state,
            values :values,
            datas  :datas
        }
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
