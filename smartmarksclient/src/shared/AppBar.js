import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import history from "../history";
import {ACCESS_TOKEN} from "../constants/constants";
import TextField from "@material-ui/core/TextField";
import axios from "../utils/API";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
const styles = (theme) => ({
	root: {
    flexGrow: 1,
    display: "flex",
  },
	appBar: {
    zIndex: 140000 ,
    position: "absolute",
	},
	menu: {
		zIndex: 140001
	},
	grow: {
    flexGrow: 1,
  },
	toolbar: theme.mixins.toolbar,
	textField: {
		height: 30,
		margin: 0,
	},
	button: {
		maxWidth: theme.spacing.unit * 10,
		height: "auto",
		marginRight: theme.spacing.unit * 5,
		marginLeft: theme.spacing.unit *2,
	},
	endAnchor: {
		display: "inline-flex",
	},
	dialogList: {
		width: "100%",
	},
	card: {
		width: "100%"
	},
});

class ApplicationBar extends React.Component {
	constructor() {
		super();
		this.state = {
			anchorEl: null,
			url: null,
			dialogOpen: false,
			};
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		}
		
		// For old on/off switch but leave here
		handleMenu = (event) => {
			console.log(this.state);
			this.setState({anchorEl: event.currentTarget});
		}
	
		handleClose = () => {
			this.setState({anchorEl: null});
		}

		handleChange = (event) => {
			const newState = {...this.state};
			newState.url = event.target.value;
			this.setState(newState);
		}

		handleLogout() {
			localStorage.removeItem(ACCESS_TOKEN);
			history.push("/");
		}

		handleOpenDialog() {
			this.setState({dialogOpen: true});
		}
		handleCloseDialog() {
			this.setState({dialogOpen: false});
		}

		handleBookmarkAdd() {

		}

    render() {
			const {classes} = this.props;
			const open = Boolean(this.state.anchorEl);
        return (
					<div className={classes.root}>
						<AppBar position="static" style={{background: "#596982", overflow: "auto"}}className={classes.appBar}>
							<Toolbar className={classes.toolbar}>
								<Typography variant="h6" color="inherit" className={classes.grow}>
									SmartMarks
								</Typography>
							
							{/*This code is related to the login/register buttons and account tooltip.  */}

								{this.props.isAuthenticated? (
									<div className={classes.endAnchor}>
										<form>
											<TextField className={classes.textField}
												id="outlined-name"
												label="URL"
												value={this.state.url}
												onChange={this.handleChange}
												margin="normal"
												variant="outlined"
											/>
											<Button className={classes.button} onClick={this.handleOpenDialog} variant="contained" color="primary">Add Bookmark</Button>
										</form>
										<IconButton
											aria-owns={open ? 'menu-appbar' : undefined}
											aria-haspopup="true"
											onClick={this.handleMenu}
											color="inherit"
										>
											<AccountCircle />
										</IconButton>
										<Menu
											className={classes.menu}
											id="menu-appbar"
											anchorEl={this.state.anchorEl}
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right',
											}}
											open={open}
											onClose={this.handleClose}
										>
										
											<MenuItem onClick={this.handleClose}>Profile</MenuItem>
											<MenuItem onClick={this.handleLogout}>Logout</MenuItem>
										</Menu>
									</div>
								) : (
								<div>
									<Link to={"/login"}><Button variant="contained" color="primary">Login</Button></Link>
									<Link to={"/register"}><Button variant="contained" color="secondary">Register</Button></Link>
								</div>)}
							</Toolbar>
							<Dialog
								open={this.state.dialogOpen}
								onClose={this.handleClose}
								aria-labelledby="form-dialog-title"
							>
								<DialogTitle id="form-dialog-title">Add Bookmark</DialogTitle>
								<DialogContent>
								<Card className={classes.card}>
									<CardHeader
										title="Shrimp and Chorizo Paella"
									/>
									<CardMedia
										className={classes.media}
										image="/static/images/cards/paella.jpg"
										title="Paella dish"
									/>
									<CardContent>
										<Typography variant="h5">
											URL:{this.state.url}
										</Typography>
									</CardContent>
								</Card>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleCloseDialog} color="primary">
										Cancel
									</Button>
									<Button onClick={this.handleCloseDialog} color="primary">
										Add Bookmark
									</Button>
								</DialogActions>
							</Dialog>
						</AppBar>
					</div>
				)
   	}	
}

ApplicationBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ApplicationBar);
