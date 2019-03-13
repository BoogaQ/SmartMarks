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

const styles = (theme) => ({
	root: {
    flexGrow: 1,
    display: "flex",
  },
	appBar: {
    zIndex: 140000 ,
    position: "absolute",
	},
	grow: {
    flexGrow: 1,
  },
	toolbar: theme.mixins.toolbar,
});

class ApplicationBar extends React.Component {
	constructor() {
		super();
		this.state = {
				auth: false,
				anchorEl: null
		};
		}
		// For old on/off switch but leave here
		handleChange = (event) => {
			this.setState({auth: event.target.checked});
		}
	
		handleMenu = (event) => {
			this.setState({anchorEl: event.currentTarget});
		}
	
		handleClose = () => {
			this.setState({anchorEl: null});
		}

    render() {
			const {classes} = this.props;
			const open = Boolean(this.props.anchorEl);
        return (
					<div className={classes.root}>
						<AppBar position="static" style={{background: "#596982", overflow: "auto"}}className={classes.appBar}>
							<Toolbar className={classes.toolbar}>
								<IconButton color="inherit" aria-label="Menu">
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" color="inherit" className={classes.grow}>
									SmartMarks
								</Typography>
							
							{/*This code is related to the login/register buttons and account tooltip.  */}

								{this.state.auth? (
									<div>
										<IconButton
											onClick={this.handleMenu}
											color="inherit"
										>
											<AccountCircle />
										</IconButton>
										<Menu
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
											<MenuItem onClick={this.handleClose}>My account</MenuItem>
										</Menu>
									</div>
								) : (
								<div>
									<Link to={"/login"}><Button variant="contained" color="primary">Login</Button></Link>
									<Link to={"/register"}><Button variant="contained" color="secondary">Register</Button></Link>
								</div>)}
							</Toolbar>
						</AppBar>
					</div>
				)
   	}	
}

ApplicationBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ApplicationBar);
