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
            if(this.props.type == "number") {
                var toNumberRegXep = /[^a-zA-Zа-яА-Я_|]/;
                var test = toNumberRegXep.test(e.target.value);
                if(test || !e.target.value){
                    this.setState({value:e.target.value,error:error});
                }else{
                    error = true;
                    this.setState({error:error});
                }
            }else{
                this.setState({value:e.target.value,error:error});
            }
            //this.setState({value:e.target.value,error:error});
            if(this.props.onChange)this.props.onChange({value:e.target.value,key_value:this.props.key_value});
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
            //if(this.refs.editor )$(this.refs.editor).blur();
        },
        setError(error){
            this.setState({error:error});
        },
        render:function(){
            var self = this;
            var classInput = "my ui input";
            if(this.props.disabled)classInput += " disabled";
            if(this.state.error)   classInput += " error";
            if(this.props.haveRightLabel) classInput += " right labeled ";
            var type = this.props.type;
            if(this.props.type == "number"){
                type = "text"
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
                        type={type ||"text"}
                        title={this.props.title ||""}
                        pattern={this.props.pattern ||""}
                        maxLength = {this.props.maxlength ||""}
                        placeholder={this.props.placeholder?this.props.placeholder:this.props.label||""}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    {this.props.haveRightLabel?
                        <div className="ui basic label">
                            {this.props.rightLabelText}
                        </div>
                        :null}
                </div>
            )
        }
    });
    return Text;
});
