import React, { Component } from 'react';
import Comments from './comment';
import {
	TableBody,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
  import IconButton from 'material-ui/IconButton';

class ItemDetails extends Component {
    render() {
        const comments = this.props.itemDescription.comments.map((comment)=>{
            return(
                <Comments 
                onCommentDelete={(_id) => this.props.onCommentDelete(_id, this.props.itemDescription.servername)}
                
                key={comment._id}
                comment={comment}/>
            );
        });
        
        return(
            <TableRow selectable={false}>
            <TableRowColumn>
            </TableRowColumn>
                <TableRowColumn>                    
                    <IconButton
                        touch={true}
                        iconClassName="material-icons"
                        onClick={() => {
                                console.log('itemdetails: ',this.props.itemDescription.servername);
                                this.props.onItemDelete( this.props.itemDescription.servername)
                            }
                        }
                    >
                    delete
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
        );
    }
}

export default ItemDetails;