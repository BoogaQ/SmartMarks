import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import { ajax } from "../utils/API";
import {API_URL} from "../constants/constants";
import Chip from "@material-ui/core/Chip";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Delete from "@material-ui/icons/Delete";
import Link from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";
import CreateNewFolder from "@material-ui/icons/CreateNewFolder";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FolderIcon from "@material-ui/icons/Folder";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const styles = (theme) => ({
	card: {
		margin: theme.spacing.unit,
		minHeight: 350,
		height: 350,
		display: "flex",
		flexDirection: 'column',
		overflow: "auto",
		[theme.breakpoints.down(300)]: {
			width: 300,
			marginLeft: "auto",
			marginRight: "auto",
		  },
	},  
	cardContent: {
		flexGrow: 1,
		overflow: "hidden",
		height: 100,
		textOverflow: "ellipsis",
		width: "auto",
	},
	chip: {
		margin: theme.spacing.unit * 0.2,
		fontSize: "0.7em",
	},
	footer: {
		display: "inline-block",
		overflowWrap: "break-word",
		width: "100%",

	},
	footerItem: {
		width: 1,
	},
	menu: {
		zIndex: 140001
	},
});

class Bookmark extends React.Component {
	constructor() {
		super();
		this.state = {
			tags: [],
			isFavourite: false,
			addProjectOpen: false,
			anchorEl: null,
			tagName: undefined,
			dialogOpen: false,
			dialog2Open: false,
		};
	}
	handleClose = () => {
		this.setState({anchorEl: null});
	}

	handleCloseDialog = () => {
		this.setState({dialogOpen: false});
	}

	handleCloseDialog2 = () => {
		this.setState({dialog2Open: false});
	}

	openTagDialog = () => {
		this.setState({dialogOpen: true, anchorEl: null});
	}

	openProjectDialog = () => {
		this.setState({dialog2Open: true, anchorEl: null});
	}

	handleChangeTag = (event) => {
		const newState = {...this.state};
		newState.tagName = event.target.value;
		this.setState(newState);
	}

	handleMenu = (event) => {
		this.setState({anchorEl: event.currentTarget});
	}
	handleDelete = () => {
		ajax.post(API_URL + "bookmarks/remove", this.props.url)
		.then(response => {
			console.log(response.data);
			this.props.containerRemove(this.props.url)
		}).catch(error => {
			console.log(error.response);
		})
	}
	handleFavourite = () => {
		console.log(API_URL + "bookmarks/favourites/tagUrl=" + encodeURIComponent(this.props.url));
		ajax.post(API_URL + "bookmarks/favourites/tagUrl=" + encodeURIComponent(this.props.url)).then(response => {
		  this.setState({isFavourite: true});
		}).catch(error => {
		  console.log(error);
		})
	  }

	addTag = (event) => {
		event.preventDefault();
		if (this.state.tagName != null) {
			const payload = {bookmark: this.props.url, tagName: this.state.tagName}
			ajax.post(API_URL + "tags/addTag", payload).then(response => {
				this.setState({tags: response.data});
				console.log(this.state.tags);
				this.handleCloseDialog();
			}).catch(error => {
				console.log(error);
			})
		}
	}
	addToProject = (projectName) => {
		const payload = {bookmark: this.props.url, projectName: projectName};
		ajax.post(API_URL + "projects/addToProject", payload).then(response => {
			this.handleCloseDialog2();
		}).catch(error => {
			console.log(error);
		})
	}
	render() {
		const {classes} = this.props;
		const open = Boolean(this.state.anchorEl);
		return (
			<div>
			<Card className={classes.card}>
				<CardMedia
					image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
					title="Image title"
				/>
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h6" component="h2">
						{this.props.title}
					</Typography>
				</CardContent>
				<CardContent>
					{this.props.tags?  (this.props.tags.map(tag => (
							<Chip
								key={tag}
								label={tag.tagName}
								className={classes.chip}
								variant="outlined"
								color="primary"
							/>
					))) : (<Chip label="No tags"/>)}
				</CardContent>
				<CardActions className={classes.footer}>
					<Tooltip title={this.props.url}>
						<a href={this.props.url} target="_blank">
							<Button className={classes.footerItem} size="small" color="primary">
								<Link/>
							</Button>
						</a>
					</Tooltip>
					<Tooltip title="Favorite">
						<Button className={classes.footerItem} onClick={this.handleFavourite} color="primary">
						{this.state.isFavourite? (<Favorite/>) : (<FavoriteBorder/>) }							
						</Button>
					</Tooltip>
					<Tooltip title="Remove">
						<Button className={classes.footerItem} onClick={this.handleDelete} color="primary">
							<Delete/>
						</Button>
					</Tooltip>
					<Tooltip title="Add">
						<Button className={classes.footerItem} onClick={this.handleMenu} color="primary">
							<CreateNewFolder/>
						</Button>
					</Tooltip>
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
					<MenuItem onClick={this.openProjectDialog}> Add To Project </MenuItem>
					<MenuItem onClick={this.openTagDialog}> Add Tag </MenuItem>
					</Menu>
				</CardActions>
			</Card>
			<Dialog 
				open={this.state.dialogOpen}
				onClose={this.handleCloseDialog}
				aria-labelledby="form-dialog-title">
			<form onSubmit={this.addTag}>
				<DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
				<DialogContent>
					<ValidatorForm
						ref="form"
						onSubmit={this.addTag}
						onError={errors => console.log(errors)}
					>
						<FormControl required fullWidth>
							<TextValidator
								label="Tag"
								onChange={this.handleChangeTag}
								name="tag"
								value={this.state.tagName}
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
						Add Tag
					</Button>
				</DialogActions>
				</form>
			</Dialog>
			<Dialog 
				className={classes.projectDialog}
				open={this.state.dialog2Open}
				onClose={this.handleCloseDialog2}>
			
				<DialogTitle>Add To Project...</DialogTitle>
				<DialogContent>
					<List>
						{this.props.projects? (this.props.projects.map(project => (
							<ListItem button key={2} onClick={() => this.addToProject(project.name)}>
								<ListItemIcon>
									<FolderIcon />
								</ListItemIcon>
								<ListItemText primary={project.name} />
							</ListItem>
						))): (<ListItem button key={2}>
									<ListItemIcon>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary="Empty" />
								</ListItem>)
						}
					</List>
				</DialogContent>
			</Dialog>
			</div>
		)
	}
}

Bookmark.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired
}

export default withStyles(styles)(Bookmark);