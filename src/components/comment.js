import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newComment:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
    }
    
    handleNewComment(e) {
        // console.log(e.target.value);
        this.setState({newComment:e.target.value});
    }
    handleOpen() {
        this.setState({open: true});
    }

    handleClose () {
        this.setState({open: false});
    }
    handleSubmit(e){
        // console.log(this.state.newComment);
        this.props.onCommentEdit(this.state.newComment, this.props.comment.username, this.props.comment.comment);
        this.setState({open: false});
    }
    handleClick(e) {
        console.log(this.props.comment.username);
    }
    render() {
        // console.log("Hello");
        const actions = [
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSubmit}
            />,
            <FlatButton
            label="Cancel"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleClose}
          />
          ];
        return (
            <div>
            <TableRow >
                <TableRowColumn>
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        tooltip="Edit"
                        onClick={this.handleOpen}
                    >
                    edit
                    </IconButton>
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
            <Dialog
                title="Edit comment"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                You are editing {this.props.comment.username}'s comment<br/>
                <TextField 
                onChange={this.handleNewComment}
                hintText={this.props.comment.comment} />
            </Dialog>
          </div>
        );
    }
}

export default Comments;