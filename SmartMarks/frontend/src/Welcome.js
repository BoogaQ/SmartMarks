import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppBar from "./shared/AppBar";

const styles = (theme) => ({
	root: {
    flexGrow: 1,
    display: "flex",
  },
	appBar: {
    zIndex: 0,
    position: "absolute",
	},
	toolbar: theme.mixins.toolbar,
});

class WelcomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			isAuthenticated: false,
			currentUser: null,
		}
	}
	

	render() {
		const {classes} = this.props;
		return (
				<AppBar/>
		)
	}
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(WelcomePage);