import React, { Component } from 'react';
import {
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';

class Comments extends Component {
    render() {
        return (
            <TableRow >
                <TableRowColumn>{this.props.comment.username}</TableRowColumn>
                <TableRowColumn>{this.props.comment.comment}</TableRowColumn>
                {this.props.children[0]}
            </TableRow>
        );
    }
}

export default Comments;