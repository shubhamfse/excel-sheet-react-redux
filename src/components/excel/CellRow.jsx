import React from "react";

import Cell from "./Cell.jsx";
import RowHeader from "./RowHeader.jsx";

export default class CellRow extends React.Component {
    render = () => {
	    let tableCells = [];

	    tableCells.push(<RowHeader key={0} index={this.props.trowdata.index} updateActiveCell={this.props.updateActiveCell}/>);
	    const that =this;
		this.props.trowdata.data.map(function(tcell, index){
			tableCells.push(<Cell edit={true} key={index + 1} celldata={tcell} updateActiveCell={that.props.updateActiveCell}/>);
		});

        return (
            <tr key={this.key} data-index={this.props.trowdata.index}>
	            {tableCells}
            </tr>
    );
  }
}
