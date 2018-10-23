define(['react'], function(React) {
    var Multiselect = React.createClass({
        formater:function(){
            var list = this.props.list;
            if(_.isArray(this.props.list)|| _.isObject(this.props.list)){
                if(!_.isObject(this.props.list[0])){
                    list=[];
                    for(var i in this.props.list){
                        list.push({id:this.props.list[i],name:this.props.list[i]})
                    }
                }
            };
            return list
        },
        componentDidMount :function(){
            if(this.props.select){
                //$(this.refs.multiselect.getDOMNode()).val(this.props.select);
            }
            let self = this;
            $(this.refs.multiselect).dropdown({
                forceSelection:true,
                action: 'activate',
                onChange: function(value, text, $selectedItem) {
                    self.props.onchange(value);
                }
            })
            $(this.refs.multiselect).dropdown('set selected',this.props.selected || []);
        },
        componentWillReceiveProps:function(nextProps){
        },
        getData: function(){
            var val =  $(this.refs.multiselect)
                .dropdown('get value');
            return val
        },
        setDefaultValue:function(val){
            $(this.refs.multiselect).val(val)
           // this.setState({value:val,error:false});
            //if(this.refs.editor )$(this.refs.editor).blur();
        },
        render:function(){
            var formater=this.formater();
            var self = this;
            return(
                <div className={this.props.error?"my multiselect-wrapper error":"my multiselect-wrapper"}>
                    {this.props.label?<label className="my my-label">{this.props.label}</label>:null}
                    <div className="ui multiple dropdown" ref="multiselect">
                        <input type="hidden" name="filters" />
                        <i className="filter icon"></i>
                        <span className="text">Содержит теги...</span>
                        <div className="menu">
                            <div className="ui icon search input">
                                <i className="search icon"></i>
                                <input type="text" placeholder="Search tags..." />
                            </div>
                            <div className="scrolling menu">
                                {formater.map(function(item){
                                    item = self.props.itsModel? item.attributes : item;
                                    return <div className="item" key={item.id} data-value={item.id}><div className={"ui empty circular label "+item.type} ></div>{item.name}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });
    return Multiselect;
});
