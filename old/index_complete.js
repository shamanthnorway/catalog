import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
// import registerServiceWorker from './registerServiceWorker';

class SoftwareBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = { softwareData: [] };
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}
	
	loadCommentsFromServer() {
		axios.get(this.props.url)
		.then(res => {
		this.setState({ softwareData: res.data });
	})
	}
	handleCommentSubmit(comment) {
	//add POST request

	}
	componentDidMount() {
		this.loadCommentsFromServer();
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
				<div>
					{this.state.softwareData.map(function(ub){
						let values = ub.description.map((val) => {
							{/* console.log(val); */}
							let comments = val.comments.map((str) => {
								return (
									<TableRow>
										<TableRowColumn>{str.username}</TableRowColumn>
										<TableRowColumn>{str.comment}</TableRowColumn>
									</TableRow>
								);
							});
							return(
								<TableRow>
									<TableRowColumn>{val.servername}</TableRowColumn>
									<TableRowColumn>{val.link}</TableRowColumn>
									<TableRowColumn><TableBody>{comments}</TableBody></TableRowColumn>
								</TableRow>
							);
						});
						return(
							<Card>
								<CardHeader
								title={ub.name}
								actAsExpander={true}
								showExpandableButton={true}
								/>
								<CardText expandable={true}>
								<Table multiSelectable={true}>
								<TableHeader enableSelectAll={true}>
									<TableRow>
										<TableHeaderColumn>Server Name</TableHeaderColumn>
										<TableHeaderColumn>Links or shortcuts</TableHeaderColumn>
										<TableHeaderColumn>Comments</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody stripedRows={true}>
								{values}
								</TableBody>
							</Table>
								</CardText>
							</Card>
						);
					})}
				</div>
			</MuiThemeProvider>
		)
	}
}

ReactDOM.render(<SoftwareBox url='http://localhost:3001/' pollInterval={2000} />, document.getElementById('root'));
// registerServiceWorker();
