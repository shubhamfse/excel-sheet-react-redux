import React from "react";

export default class RowHeader extends React.Component {
  handleOnClick = (evt) => {
  		this.props.updateActiveCell({x: this.props.index, y : '', value :''});
      }
	render = () => {
		let rowNumber = this.props.index + 1;
        return (
		    <td className="rowcolumnheaders" onClick={this.handleOnClick.bind(this)} key={this.key} data-index={this.props.index}>{rowNumber}
            </td>
        );
    }
}
