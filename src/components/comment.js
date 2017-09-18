import React, { Component } from 'react';
import {
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(this.props.comment.username);
    }
    render() {
        // console.log("Hello");
        return (
            <TableRow >
                <TableRowColumn>
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        tooltip="Edit"
                    >
                    create
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn>
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        tooltip="Edit"
                        onClick={() => this.props.onCommentDelete(this.props.comment.comment)}
                    >
                    delete
                    </IconButton>
                </TableRowColumn>
                <TableRowColumn>{this.props.comment.username}</TableRowColumn>
                <TableRowColumn>{this.props.comment.comment}</TableRowColumn>
                {/* {this.props.children[0]} */}
            </TableRow>
        );
    }
}

export default Comments;