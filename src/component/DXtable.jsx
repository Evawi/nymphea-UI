'use strict';

import React from 'react';
require('devextreme/ui/data_grid');
//import dataGrid from 'devextreme/ui/data_grid';

export default class DataGrid extends React.Component {
    constructor(props){
        super()
    }
    componentDidMount(){
        let SELF = this;
        $(this.refs.grid).dxDataGrid({
            height:"100%",
            dataSource: SELF.props.ds,
            columns:    SELF.props.columns,
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50, 100],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            sorting: {
                mode: "multiple"
            },
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: "Search..."
            },
            noDataText:"nodata",
            rowAlternationEnabled:true,
            hoverStateEnabled:true,
            allowColumnReordering: true,
            allowColumnResizing: true,
            columnAutoWidth: true,
            columnResizingMode:'widget',
            columnChooser: {
                enabled: true
            },
             columnFixing: {
                enabled: true
            },
            onToolbarPreparing: function(e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function() {
                            let ts = SELF.props.trans();
                        }
                    }
                })
            }
            // TODO:группировка
            /*grouping: {   //группировка
                autoExpandAll: true,
            },
            groupPanel: {
                visible: true
            },*/

        })
    }
    render(){
        return(
            <div className="grid">
                <div ref="grid"></div>
            </div>
        )
    }
}