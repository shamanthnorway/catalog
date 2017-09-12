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
		this.state = { catalogData: [] };
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
	}
	
	loadCommentsFromServer() {
		axios.get(this.props.url)
		.then(res => {
		this.setState({ catalogData: res.data });
    })}
    
	componentDidMount() {
		this.loadCommentsFromServer();
		// setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}
    render() {
        if(this.state.catalogData.length === 0) {
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
        // console.log(this.state.catalogData.length);
        const catalogItems=this.state.catalogData.map((item)=>{
            return (
                <Items 
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