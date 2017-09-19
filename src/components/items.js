import React, { Component } from 'react';
import ItemDetails from './item_detail';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow
  } from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
injectTapEventPlugin();

const style = {
    height: 10,
    width: '97%',
    margin: 30,
    textAlign: 'center',
    display: 'inline-block',
  };

class Items extends Component {
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
        // console.log(this.props.catalogItem._id);
        this.props.onItemAdd(this.state.newServername, this.state.newLink, this.props.catalogItem._id);
        this.setState({open: false});
    }
    handleClick(e) {
        // console.log(this.props.comment.username);
    }
    render() {
        const actions = [
            <FlatButton
              label="Submit"
              primary={false}
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
        // console.log(this.props.catalogItem);
        const itemDescription = this.props.catalogItem.description.map((description) => {
            return (
                <ItemDetails 
                onCommentDelete={(commentID, itemDetails_servername ) => this.props.onCommentDelete(commentID, itemDetails_servername, this.props.catalogItem._id)}
                onItemDelete={( itemDetails_servername ) => this.props.onItemDelete( itemDetails_servername, this.props.catalogItem._id)}
                onCommentEdit={(newComment, username, oldComment, itemDetails_servername ) => this.props.onCommentEdit(newComment, username, oldComment, itemDetails_servername, this.props.catalogItem._id)}
                onItemEdit={( newServername, newLink, oldServername ) => this.props.onItemEdit( newServername, newLink, oldServername, this.props.catalogItem._id)}
                key={description.servername} 
                itemDescription={description}/>
            );
        });
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                <Paper style={style} zDepth={10} >
                    <Card>
                        <CardHeader
                        title={this.props.catalogItem.name}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                        <CardText expandable={true} selectable={true}>
                        <Table>
                            <TableHeader>
                                <TableRow>                                    
                                    <TableHeaderColumn>
                                        <IconButton
                                            touch={true}
                                            iconClassName="material-icons"
                                            onClick={this.handleOpen}
                                        >
                                        add
                                        </IconButton>
                                    </TableHeaderColumn>
                                    <TableHeaderColumn>Server Name</TableHeaderColumn>
                                    <TableHeaderColumn>Links or shortcuts</TableHeaderColumn>
                                    <TableHeaderColumn>Comments</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={true}>
                                {itemDescription}
                            </TableBody>
                        </Table>
                        </CardText>
                    </Card>
                </Paper>
            <Dialog
                title="Add new Item"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                You are adding new item for {this.props.catalogItem.name} <br/>
                Description: 
                <TextField 
                onChange={this.handleNewServername}
                hintText={'New servername'} />
                <br/>
                Link or location: 
                <TextField 
                onChange={this.handleNewLink}
                hintText={'New Link or Location'} />
            </Dialog>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Items;