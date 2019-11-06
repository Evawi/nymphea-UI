'use strict';
import COMPONENT  from '../../class/component.class.jsx';
import DependencyUI  from '../../extra/checkDependencyUI.js';
/* props:
 * key_value         = " "    //идентификатор поля
 * position          = "horizontal" || "attached"(top,bottom,top right, top left,bottom left,bottom right) || "floating"   //позиция
 * customClass       = " "    //дополнительный класс
 * icon              = ""  //class иконки
 * onClick           = null  //событие нажатия по всему полю mainClass
 * */

/*state
 * additionClass = "" //дополнительный изменяемый класс
 * icon = ""         // изменяиемая иконка
 * value  = ""
 * */

export default class INPUT extends COMPONENT {
    constructor(props = {}){
        super();

        this.CONSTVIEW = {
            name:"label",
            mainClass: DependencyUI["label"]().mainClass
        };

        this.mainClass      = this.mainClass.bind(this);

        this.state = {
            additionClass : "",
            icon:           "",
            value :         ""
        }
    }
    componentDidMount(){
        let self = this;
        $(this.refs.editor).blur(function(e){
            if(self.props.onBlur)self.props.onBlur(e)
        })
    }
    mainClass(){
        let cssClass = " nymphea_"+this.CONSTVIEW.name+" "+ this.CONSTVIEW.mainClass;
        cssClass += this.props.position;
        cssClass += this.props.customClass;
        cssClass += this.state.additionClass;
        return cssClass
    }
    setData(props){
        if(props.value != undefined) this.setState({value:props.value})
    }
    render(){
        let self = this;
        let icon;
        if(this.props.icon){
            icon = [<i key="icon" className={this.props.icon+" icon"}></i>]
        }
        if( this.state.icon){
            icon = [<i key="icon" className={this.state.icon+" icon"}></i>]
        }
        return(
            <div className={this.mainClass()} onClick={this.props.onClick? this.props.onClick.bind(null,this.props.key_value) : null}>
                {icon}
                {this.state.value}
            </div>
        )
    }
}