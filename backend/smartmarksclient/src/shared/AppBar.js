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
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import history from "../history";
import {API_URL} from "../constants/constants";
import {ACCESS_TOKEN} from "../constants/constants";
import TextField from "@material-ui/core/TextField";
import {ajax} from "../utils/API";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import axios from "axios";
import Loader from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";
import Logo from "../logo.png";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme) => ({
	root: {
    flexGrow: 1,
    display: "flex",
  },
	appBar: {
    zIndex: 140000 ,
		position: "fixed",
		height: "9vh"
	},
	menu: {
		zIndex: 140001
	},
	grow: {
    flexGrow: 1,
  },
	toolbar: theme.mixins.toolbar,
	textField: {
		height: 50,
		margin: 0,
	},
	projectTextField: {
		height: 40,
	},
	button: {
		height: 54,
		maxWidth: theme.spacing.unit * 9,
		marginLeft: theme.spacing.unit *2,
		textTransform: "capitalize",
	},
	projectButton: {
		height: 54,
		maxWidth: theme.spacing.unit * 9,
		marginRight: theme.spacing.unit * 5,
		marginLeft: 0,
		textTransform: "capitalize",
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
	header: {
		textAlign: "center",
		display: "flex",
		justifyContent: "center",
		flxWrap: "wrap",
	},
	projectDialog: {
		minHeight: 100,
	},
});

class ApplicationBar extends React.Component {
	constructor() {
		super();
		this.state = {
			anchorEl: null,
			url: null,
			isLoading: false,
			siteName: null,
			dialogOpen: false,
			dialog2Open: false,
			tags: [],
			tagsLoading: true,
			projectName: undefined,			
			};
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		}
		// Handle logging out of account
		handleLogout() {
			localStorage.removeItem(ACCESS_TOKEN);
			history.push("/");
		}
		handleMenu = (event) => {
			this.setState({anchorEl: event.currentTarget});
		}
		processUrl = (url) => {
			if (!/^(?:f|ht)tppps?:\/\//.test(url)) {
				url = "http://" + url;
			}
			return url;
		}	
		// Handle closing of profile anchor
		handleClose = () => {
			this.setState({anchorEl: null});
		}

		// ***************** Functions for adding bookmark dialog *****************************
		handleChange = (event) => {
			const newState = {...this.state};
			newState.url = event.target.value;
			this.setState(newState);
		}
		handleOpenDialog() {
			this.setState({dialogOpen: true, isLoading: true});
			this.sendTagRequest(this.state.url);
			axios.get("http://textance.herokuapp.com/title/" + this.processUrl(this.state.url))
			.then(response => {
				if (response.data !== "") {
					this.setState({siteName: response.data, isLoading: false})
				}			
			})
			.catch(error => {
				console.log(error.body);
			}) 
		}
		handleChangeProject = (event) => {
			const newState = {...this.state};
			newState.projectName = event.target.value;
			this.setState(newState);
		}
		sendTagRequest = (url) => {							
			this.setState({tagsLoading: true});					
			ajax.post(API_URL + "bookmarks/analyse", this.processUrl(url))
				.then(response => {
					console.log(response);
					this.setState({tags: response.data, tagsLoading: false});
				})
				.catch(error => {
					console.log(error);
				})
		} 
		handleSubmitBookmark = (event) => {
			event.preventDefault();
			const bookmark = {name: this.state.siteName, url: this.processUrl(this.state.url), tags: this.state.tags}
			if (this.state.siteName!=null) {
				ajax.post(API_URL + "bookmarks/add", bookmark)
					.then(response => {
						this.handleCloseDialog();
						this.setState({siteName: null, tags: []});
						this.props.onBookmarkAdd();
						console.log(response);
					}).catch(error => {
						console.log(error.response);
					})
			}
		}
		handleDeleteChip = data => () => {
			this.setState(state => {
				const tags = [...state.tags];
				const indexToDelete = tags.indexOf(data);
				tags.splice(indexToDelete, 1);
				return {tags};
			})
		}
		// Close bookmark adding dialog
		handleCloseDialog() {
			this.setState({dialogOpen: false, dialog2Open: false});
		}

		// ***************** End of Functions for adding bookmark dialog *****************************

		// ***************** Functions for adding project dialog *****************************
		
		handleProjectDialog = () => {
			this.setState({dialog2Open: true});
		}
		addProject = (event) => {			
			event.preventDefault();
			if (this.state.projectName != null) {
				ajax.post(API_URL + "projects/addProject", this.state.projectName)
					.then(response => {
						this.handleCloseDialog();
						this.setState({projectName: undefined});
						this.props.onProjectAdd();
						console.log(response);
					}).catch(error => {
						console.log(error);
					})
			}
		}

		
		// Submits request to add selected bookmark to the currently logged in user.
		

    render() {
			const {classes} = this.props;
			const {currentUser} = this.props;
			const open = Boolean(this.state.anchorEl);
        return (
					<div className={classes.root}>
						<AppBar position="static" style={{background: "#596982", overflow: "auto"}}className={classes.appBar}>
							<Toolbar className={classes.toolbar}>
								<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
									<img src={Logo} alt="logo" width="100" height= "44"/>
								</IconButton>
								<Typography variant="h6" color="inherit" className={classes.grow}>
								</Typography>
							
							{/*This code is related to the login/register buttons and account tooltip.  */}

								{this.props.isAuthenticated? (
									<div className={classes.endAnchor}>
										<TextField className={classes.textField}
											id="outlined-name"
											label="URL"
											value={this.state.url}
											onChange={this.handleChange}
											margin="normal"
											variant="outlined"
										/>
										<Button className={classes.button} onClick={this.handleOpenDialog} variant="contained" color="primary">Add Bookmark</Button>
										<Button className={classes.button} onClick={this.handleProjectDialog} variant="contained" color="secondary">Add Project</Button>
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
										
											<MenuItem onClick={this.handleClose}>{currentUser.userName}</MenuItem>
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
								onClose={this.handleCloseDialog}
								aria-labelledby="form-dialog-title"
							> <form onSubmit={this.handleSubmitBookmark}>
								<DialogTitle id="form-dialog-title">Add Bookmark</DialogTitle>
								<DialogContent>
								<Card className={classes.card}>
									<div className={classes.header}>
									{this.state.isLoading? (<Loader/>) : (<CardHeader
																													title= {this.state.siteName? (this.state.siteName) : ""}
																												/>)}	
									</div>
									<CardMedia
										className={classes.media}
									/>
									<CardContent>
										<Typography variant="h5">
											URL:{this.processUrl(this.state.url)}
										</Typography>
									</CardContent>
									<div className={classes.header}>
									{this.state.tagsLoading? (<Loader/>)
									 : (<CardContent>
												<Typography variant="h5">
													Tags:{this.state.tags.map(data => {
														let icon = null;
														return (
															<Chip
																key={data}
																icon={icon}
																label={data}
																onDelete={this.handleDeleteChip(data)}
																className={classes.chip}
																variant="outlined"
																color="primary"
															/>
														)
													})}
												</Typography>
											</CardContent>)}	
									</div>								
								</Card>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleCloseDialog} color="primary">
										Cancel
									</Button>
									<Button type="submit" onClick={this.handleCloseDialog} color="primary">
										Add Bookmark
									</Button>
								</DialogActions>
								</form>
							</Dialog>
							<Dialog 
								className={classes.projectDialog}
								open={this.state.dialog2Open}
								onClose={this.handleCloseDialog}
								aria-labelledby="form-dialog-title">
								<form onSubmit={this.addProject}>
								<DialogTitle id="form-dialog-title">Add Project</DialogTitle>
								<DialogContent>
									<ValidatorForm
										ref="form"
										onSubmit={this.addProject}
										onError={errors => console.log(errors)}
									>
										<FormControl required fullWidth className={classes.projectTextField}>
											<TextValidator
												label="Project"
												onChange={this.handleChangeProject}
												name="project"
												value={this.state.projectName}
												validators={['required']}
												errorMessages={['This field is required']}
											/>
										</FormControl>
									</ValidatorForm>
								</DialogContent>
								<DialogActions>
									<Button onClick={this.handleCloseDialog} color="primary">
										Cancel
									</Button>
									<Button type="submit" color="primary">
										Add Project
									</Button>
								</DialogActions>
								</form>
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
