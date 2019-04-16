import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
	root: {
    flexGrow: 1,
		display: "flex",
	},
	drawer: {
		
	},
	panel: {
		padding: 0,
	},
	list: {
		width: 300,
		overflow: "auto",
	},
	block: {
		width: 300,
	},
	tagSearch: {
		width: 100,
	},
	searchItem: {
		display: "inline-block",
	}
});

const SideBar = (props) => {
		const {classes} = props;
		const {tags} = props;
		const {projects} = props;
    return (
			<div className={classes.root}>
        <Drawer variant="permanent" className={classes.drawer}>
          <Divider/>
						<List className={classes.list}>
							<ListItem key={1} style={{height: 62}}></ListItem>
							<ListItem button key={20} onClick={props.loadBookmarks}>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary="My List" />
							</ListItem>
							<ListItem button key={2}>
								<ListItemIcon>
									<FavoriteIcon />
								</ListItemIcon>
								<ListItemText primary="My Favourites" />
							</ListItem>

							<ExpansionPanel className={classes.panel}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
									<ListItem button key={99}>
										<ListItemIcon>
											<PeopleIcon/>
										</ListItemIcon>
										<ListItemText primary="Projects" />
									</ListItem>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails className={classes.panel}>
									<List className={classes.block}>											
											{projects.map(project => (						
													<ListItem button onClick={() => props.onProjectClick(project.id)} key={project.id} button className={classes.block} >
													<ListItemIcon>
														<FolderIcon/>
													</ListItemIcon>
														<ListItemText key={project.id} primary={project.name}/>
													</ListItem>																		
										))}
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>

							<ExpansionPanel className={classes.panel}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
									<ListItem button key={4}>
										<ListItemIcon>
											<LayersIcon />
										</ListItemIcon>
										<ListItemText primary="Tags" />
									</ListItem>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails className={classes.panel}>
									<List className={classes.block}>		
										<ListItem button className={classes.searchItem}>
										<ListItemIcon>
											<Search />
										</ListItemIcon>
											<ListItemText className={classes.searchItem} primary="Search: "/>
											<TextField className={classes.tagSearch}/>
										</ListItem >											
											{tags.map(tag => (						
													<ListItem button onClick={() => props.onTagClick(tag.id)} key={tag.id} button className={classes.block} >
													<ListItemIcon>
														<LocalOffer />
													</ListItemIcon>
														<ListItemText key={tag.id} primary={tag.tagName + "(" + tag.count + ")"}/>
													</ListItem>																		
										))}
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>			

							<ListItem button key={5}>
								<ListItemIcon>
									<BarChartIcon />
								</ListItemIcon>
								<ListItemText primary="Tag Visualisation" />
							</ListItem>
							<Divider/>
							<ListItem button key={6}>
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<ListItemText primary="Today" />
							</ListItem>
							<ListItem button key={7}>
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<ListItemText primary="This Week" />
							</ListItem>
							<ListItem button key={8}>
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<ListItemText primary="This Month" />
							</ListItem>
							<ListItem button key={8}>
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<ListItemText primary="Last Month" />
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