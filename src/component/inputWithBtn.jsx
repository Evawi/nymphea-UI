define(['react'], function(React) {
    /******** props
     * value = "value input" || ""
     * label = "label input" || ""
     * floatingLabel = "text" || "",
     * placeholder = "placeholder input", if null us label, if null - empty
     * disabled = "input disabled" || ""
     * checkEmpty = true || false
     * type      = "number" || "text"    default "text"
     * ********/

    var Text = React.createClass({
        getInitialState: function() {
            return{
                error:false,
                value:this.props.value||""
            }
        },
        getData:function(){
            if(this.props.checkEmpty ){
                if(this.refs.editor.value==""){this.setState({error:true});}
                else{this.setState({error:false});}
            }
            return this.refs.editor.value
        },
        onChange:function(e){
            let error = false
            if(!e.target.value && this.props.checkEmpty){
                error = true
            }
            this.setState({value:e.target.value,error:error});
            if(this.props.onChange)this.props.onChange({value:e.target.value,key_value:this.props.key_value});
        },
        onClickBtn:function(){
            if(this.props.onClickBtn)this.props.onClickBtn({inputValue:this.state.value});
            if(this.props.clearAfterClickBtn)this.clear();
        },
        componentDidMount :function(){
            let my = this;
            if(this.props.floatingLabel)$('.floating.ui.label').popup()
            $(this.refs.editor).blur(function(e){
                let error = false
                if(!e.target.value && my.props.checkEmpty){
                    error = true
                }
                my.setState({error:error});
            })
        },
        setDefaultValue(val){
            let error = false;
            this.setState({value:val,error:error});
        },
        clear(){
            this.setState({value:"",error:false});
        },
        render:function(){
            var self = this;
            var classInput = "my ui action input";
            if(this.props.disabled)classInput += " disabled";
            if(this.state.error)   classInput += " error";
            var classBtn = " ui right labeled  icon button ";

            var classIcon = "icon ";
            if(this.props.btnIcon) {
                classIcon += this.props.btnIcon+" "
            }else{
                classIcon += " check "
            }
            return(
                <div className={classInput}>
                    {this.props.label?<label className="my my-label in-input">{this.props.label}</label>:null}
                    {this.props.floatingLabel?
                        <div className="floating ui label" data-content={this.props.floatingLabel || "Click to edit" } data-position={this.props.hoverPosition || "top center" }>
                            <i className="info circle icon"></i>
                        </div>
                        :null}
                    <input
                        ref="editor"
                        min={this.props.min ||""}
                        max={this.props.max ||""}
                        type={this.props.type ||"text"}
                        pattern={this.props.pattern ||""}
                        placeholder={this.props.placeholder?this.props.placeholder:this.props.label||""}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    <button className={classBtn} onClick={this.onClickBtn}>
                        <i className={classIcon}></i>
                        {this.props.btnLabel}
                    </button>
                </div>
            )
        }
    });
    return Text;
});
