import React, { Component } from 'react';
import ItemDetails from './item_detail';
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
    width: '90%',
    margin: 30,
    textAlign: 'center',
    display: 'inline-block',
  };

class Items extends Component {
    render() {
        // console.log(this.props.catalogItem);
        const itemDescription = this.props.catalogItem.description.map((description) => {
            return (
                <ItemDetails 
                key={description.servername} 
                itemDescription={description}/>
            );
        });
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
            </MuiThemeProvider>
        );
    }
}

export default Items;