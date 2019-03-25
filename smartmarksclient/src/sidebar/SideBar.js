import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	root: {
    flexGrow: 1,
		display: "flex",
		position: "absolute",
		width: 100,
		overflow: "auto",
	},
});

const SideBar = (props) => {
    const {classes} = props;
    return (
			<div className={classes.root}>
        <Drawer variant="permanent">
          <Divider/>
						<List>
							<ListItem style={{height: 60}}></ListItem>
							<ListItem button>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary="My List" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<FavoriteIcon />
								</ListItemIcon>
								<ListItemText primary="My Favourites" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary="Projects" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<LayersIcon />
								</ListItemIcon>
								<ListItemText primary="Edit tags" />
							</ListItem>
								<ListItem button>
								<ListItemIcon>
									<BarChartIcon />
								</ListItemIcon>
								<ListItemText primary="Data Reports" />
							</ListItem>
						</List>
          <Divider/>
					<List>
						<ListSubheader inset>Saved reports</ListSubheader>
						<ListItem button>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary="Current month" />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary="Last quarter" />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary="Year-end sale" />
						</ListItem>
					</List>
        </Drawer>
			</div>
    )
}

SideBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SideBar);