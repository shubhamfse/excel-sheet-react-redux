import React from "react";
import ReactDOM from "react-dom";


export default class Cell extends React.Component {
  handleFocus = (e)  => {
	e.target.focus();
    this.props.updateActiveCell(this.props.celldata);
  }
  render() {
	  let cell = JSON.stringify(this.props.celldata);
    return (
	          <td key={this.key} data-cell={cell} data-index={this.props.celldata.y}> <div className="content-box" contentEditable={this.props.edit} onFocus={this.handleFocus.bind(this)}>{this.props.celldata.value}</div>
            </td>
    );
  }
}
