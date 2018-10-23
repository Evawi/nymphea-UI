define(['react'], function(React) {
    var Multiselect = React.createClass({
        getInitialState: function() {
            return{
                error:false
            }
        },
        isSetDef:{def:true},
        componentDidMount :function(){
            var self = this;
            $(this.refs.multiselect).dropdown({
                allowAdditions: false
            });
            if(this.props.onChange){
                $(this.refs.multiselect).dropdown({
                    onChange: function(value, text, $selectedItem) {
                        self.props.onChange({id:value,value:text,componentName:self.props.componentName});
                    }
                });
            }
        },
        setList: function(list){
            let self = this;
            if(_.isArray(list)){
                $(self.refs.multiselect).dropdown('change values',list)
                $(self.refs.multiselect).dropdown('refresh')
            }
        },
        getData: function(){
            var val =  $(this.refs.multiselect).dropdown('get value');
            return val
        },
        setDefaultValue:function(val){
            let error = false;
            //this.setState({error:error});
            let newList = _.map(val,function(node){
                return node + ""
            });
            $(this.refs.multiselect).dropdown('set selected', newList);
            $(this.refs.multiselect).dropdown('refresh');
        },
        clear(){
            $(this.refs.multiselect).dropdown('clear');
        },
        render:function(){
            var selectStyle = " ui fluid multiple search selection dropdown my-dropdown";
            if (this.state.error) selectStyle += " error";
            return(
                <div tabIndex={this.props.tabIndex} className={this.state.error?"my multiselect-wrapper error":"my multiselect-wrapper"} ref="multiVrapper">
                    {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                    <div ref="multiselect" className={selectStyle} multiple={true}>
                        <input type="hidden" />
                        <i className="dropdown icon"></i>
                        <div className="default text">Select any value</div>
                    </div>
                </div>
            )
        }
    });
    return Multiselect;
});
