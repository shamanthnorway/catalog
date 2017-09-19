import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Comments from './comment';
import {
	TableBody,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
  import IconButton from 'material-ui/IconButton';

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newServername:'',
            newLink:''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewServername = this.handleNewServername.bind(this);
        this.handleNewLink = this.handleNewLink.bind(this);
    }
    handleNewServername(e) {
        this.setState({newServername:e.target.value});
    }
    handleNewLink(e) {
        this.setState({newLink:e.target.value});
    }
    handleOpen() {
        this.setState({open: true});
    }

    handleClose () {
        this.setState({open: false});
    }
    handleSubmit(e){
        // console.log(this.state.newComment);
        this.props.onItemEdit(this.state.newServername, this.state.newLink, this.props.itemDescription.servername);
        this.setState({open: false});
    }
    handleClick(e) {
        // console.log(this.props.comment.username);
    }
    render() {
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
        const comments = this.props.itemDescription.comments.map((comment)=>{
            return(
                <Comments 
                onCommentDelete={(_id) => this.props.onCommentDelete(_id, this.props.itemDescription.servername)}
                onCommentEdit={(newComment, username, oldComment) => this.props.onCommentEdit( newComment, username, oldComment, this.props.itemDescription.servername)}
                key={comment._id}
                comment={comment}/>
            );
        });
        
        return(
            <div>
            <TableRow selectable={false}>
            <TableRowColumn>
            </TableRowColumn>
                <TableRowColumn>                    
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        onClick={() => this.props.onItemDelete( this.props.itemDescription.servername)}
                    >
                    delete
                    </IconButton>                    
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        onClick={this.handleOpen}
                    >
                    edit
                    </IconButton>
                    {this.props.itemDescription.servername}
                </TableRowColumn>
                <TableRowColumn>{this.props.itemDescription.link}</TableRowColumn>
                <TableRowColumn>
                    <TableBody>
                        {comments}
                    </TableBody>
                </TableRowColumn>
            </TableRow>
            <Dialog
                title="Edit Description"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                You are editing {this.props.itemDescription.servername} <br/>
                Description: 
                <TextField 
                onChange={this.handleNewServername}
                hintText={this.props.itemDescription.servername} />
                <br/>
                Link or location: 
                <TextField 
                onChange={this.handleNewLink}
                hintText={this.props.itemDescription.link} />
            </Dialog>
            </div>
        );
    }
}

export default ItemDetails;