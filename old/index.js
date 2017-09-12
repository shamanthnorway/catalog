import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import {deepOrange500} from 'material-ui/styles/colors'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
// import registerServiceWorker from './registerServiceWorker';
const muiTheme = getMuiTheme({
	palette: {
	  accent1Color: deepOrange500,
	},
  });
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
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					{this.state.softwareData.map(function(ub){
						let values = ub.description.map((val) => {
							{/* console.log(val); */}
							let comments = val.comments.map((str) => {
								return <li>{str.username}: {str.comment}</li>;
							});
							return(
								<TableRow>
									<TableRowColumn>{val.servername}</TableRowColumn>
									<TableRowColumn>{val.link}</TableRowColumn>
									<TableRowColumn><ul>{comments}</ul></TableRowColumn>
								</TableRow>
							);
						});
						return(
							<div>
							<h2>{ub.name}</h2>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Server Name</TableHeaderColumn>
										<TableHeaderColumn>Links or shortcuts</TableHeaderColumn>
										<TableHeaderColumn>Comments</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
								{values}
								</TableBody>
							</Table>
							</div>
						);
					})}
				</div>
			</MuiThemeProvider>
		)
	}
}

ReactDOM.render(<SoftwareBox url='http://localhost:3001/' pollInterval={2000} />, document.getElementById('root'));
// registerServiceWorker();
