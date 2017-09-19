import React, { Component } from 'react';
import axios from 'axios';
import Items from './items';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const style = {
    container: {
      position: 'relative',
    },
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
};

class Catalog extends Component {
    constructor(props) {
		super(props);
        this.state = { 
            catalogData: [],
            pollInterval:0 
        };
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
	}
	
	loadCommentsFromServer() {
		axios.get(this.props.url)
		.then(res => {
		this.setState({ catalogData: res.data });
    })}
    
	deleteCommentFromServer( commentID, ItemDetailID, itemID ) {
		axios.delete(this.props.url, {
            data:{
                type:'comment',
                itemID:itemID, 
                ItemDetailID: ItemDetailID, 
                commentID: commentID
            }
        });
    }
    
	editCommentFromServer( newComment, username, oldComment, ItemDetailID, itemID ) {
        // console.log( commentID, ItemDetailID, itemID );
		axios.post(this.props.url, {
            type:'comment',
            itemID:itemID, 
            ItemDetailID: ItemDetailID, 
            newComment: newComment, 
            username: username, 
            oldComment: oldComment            
        });
    }
    
	deleteItemDetailFromServer( ItemDetailID, itemID ) {
        console.log(itemID, ItemDetailID);
		axios.delete(this.props.url, {
            data:{
                type:'item',
                itemID:itemID, 
                ItemDetailID: ItemDetailID
            }
        });
        this.loadCommentsFromServer();
    }
    
	editItemDetailFromServer( newServername, newLink, oldServername, itemID ) {
        console.log(newServername, newLink, oldServername, itemID);
		axios.post(this.props.url, {
            type:'item',
            itemID: itemID, 
            newServername: newServername, 
            newLink: newLink, 
            oldServername: oldServername
        });
        this.loadCommentsFromServer();
    }
    
	addItemDetailFromServer( newServername, newLink, itemID ) {
        console.log(newServername, newLink, itemID);
		axios.post(this.props.url, {
            type:'addItem',
            itemID: itemID, 
            newServername: newServername, 
            newLink: newLink
        });
        this.loadCommentsFromServer();
    }
    
	componentDidMount() {
        this.loadCommentsFromServer();
        // setInterval(this.loadCommentsFromServer, this.state.pollInterval);
	}
    render() {
        if(this.state.catalogData.length === 0) {
            // this.setState({pollInterval:this.props.pollInterval});
            return (
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div style={style.container}>
                        <RefreshIndicator
                        size={40}
                        left={50}
                        top={50}
                        status="loading"
                        style={style.refresh}
                        loadingColor="#FF9800"
                        />
                    </div>
                </MuiThemeProvider>
            );
        }
        // this.setState({pollInterval:0});
        // console.log(this.state.catalogData.length);
        const catalogItems=this.state.catalogData.map((item)=>{
            return (
                <Items
                onItemAdd={(newServername, newLink, itemID) => {
                    console.log(itemID);
                    this.addItemDetailFromServer( newServername, newLink, itemID );}}
                onCommentDelete={(commentID, itemDetailsID, itemID ) => this.deleteCommentFromServer(commentID, itemDetailsID, itemID )}
                onCommentEdit={(newComment, username, oldComment, itemDetailsID, itemID ) => this.editCommentFromServer(newComment, username, oldComment, itemDetailsID, itemID )}
                onItemDelete={( itemDetailsID,itemID ) => this.deleteItemDetailFromServer( itemDetailsID, itemID )}
                onItemEdit={( newServername, newLink, oldServername,itemID ) => this.editItemDetailFromServer( newServername, newLink, oldServername, itemID )}
                key={item.name}
                catalogItem={item}/>
            );
        });
        return(
            // <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            //     {catalogItems}
            // </MuiThemeProvider>
            <div>{catalogItems}</div>
        );
    }
}

export default Catalog;