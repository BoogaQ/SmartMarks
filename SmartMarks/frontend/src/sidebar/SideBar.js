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
import {storeBookmarks} from '../actions';
import {SIMILAR_TAGS} from '../constants';

const SideBar = ({classes, bookmarks, tags, projects, dispatch}) => {
	const [tag, setTag] = React.useState('');
	const handleChange = tagId => {
    console.log(tagId);
  };
    return (
			<div className={classes.root}>
        <Drawer variant="permanent" className={classes.drawer}>
          <Divider/>
						<List className={classes.list}>
							<ListItem key={1} style={{height: 62}}></ListItem>
							<ListItem button key={20} onClick={() => dispatch(storeBookmarks(bookmarks))}>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary="My List" />
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
													<ListItem button onClick={() => {}} value={project.id} button className={classes.block} >
													<ListItemIcon>
														<FolderIcon/>
													</ListItemIcon>
														<ListItemText primary={project.name}/>
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
														<ListItem button onClick={() => dispatch({type: SIMILAR_TAGS, tag: tag.id})} value={tag.id} button className={classes.block} >
													<ListItemIcon>
														<LocalOffer />
													</ListItemIcon>
														<ListItemText primary={tag.tagName + "(" + tag.count + ")"}/>
													</ListItem>																		
										))}
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>			

							<ListItem button key={5} onClick={() => {}}>
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
							<ListItem button key={9}>
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

export default SideBar;