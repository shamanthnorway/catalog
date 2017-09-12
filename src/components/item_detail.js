import React, { Component } from 'react';
import Comments from './comment';
import {
	TableBody,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';

class ItemDetails extends Component {
    render() {
        const comments = this.props.itemDescription.comments.map((comment)=>{
            return(
                <Comments 
                key={comment._id}
                comment={comment}/>
            );
        });
        return(
            <TableRow selectable={true}>
                {this.props.children[0]}
                <TableRowColumn>{this.props.itemDescription.servername}</TableRowColumn>
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