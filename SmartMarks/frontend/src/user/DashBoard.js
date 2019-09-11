import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ApplicationBar from "../shared/AppBar";
import SideBarContainer from "../sidebar/SideBarContainer";
import history from "../history";
import {ACCESS_TOKEN, API_URL} from "../constants/constants";
import {ajax} from "../utils/API";
import Loader from "@material-ui/core/CircularProgress";
import Cookies from "universal-cookie";
import store from '../store';
import BookmarkContainer from '../shared/BookmarkContainer';
import {storeTags} from '../actions';
import {storeProjects} from '../actions';

const styles = (theme) => ({
  button: {
    margin:theme.spacing.unit
  },
  title: {
    flexGrow: 1,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unut,
    [theme.breakpoints.up(1600)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  container: {
    padding: theme.spacing.unit * 3,
    marginLeft: 300,
    overflow: "auto",
    height: "93.9vh",
  },
  drawerPaper: {
    position: 'fixed',
  },
  input: {
    display: "none"
  },
  toolbar: theme.mixins.toolbar,
});

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: undefined,
      isAuthenticated: false,
      isLoading: true,
      tags: [],
      projects: [],
      chartClicked: true,
    };
    this.handleTagClick = this.handleTagClick.bind(this);
    this.loadTags = this.loadTags.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.isAuthenticated = false;
    this.props.currentUser = null;
    history.push("/");
  }

  chartClicked = () => {
    this.setState({chartClicked: true});
  }

  loadTags = () => {
    ajax.get(API_URL + "tags/all").then(response => {
      store.dispatch(storeTags(response.data));
    }).catch(error => {
      console.log(error);
    });
  }
  loadCurrentUser = () => {
    ajax.get(API_URL + "users/user/me").then(response => {
      this.setState(
        {currentUser: response.data,
        isAuthenticated: true,
        isLoading: false,})
    }).catch(error => {
      console.log(error);
    });
  }
  handleDeleteBookmark = (url) => {
    this.props.loadBookmarks();
  }
  loadProjects = () => {
    ajax.get(API_URL + "projects/getProjects").then(response => {
      store.dispatch(storeProjects(response.data));
    }).catch(error => {
      console.log(error);
    });
  }
  
  componentDidMount = () => {
    this.loadCurrentUser();
    this.loadTags();
    this.loadProjects();
    const cookies = new Cookies();
    cookies.set("accessToken", localStorage.getItem("accessToken"), {path: "/"});
    console.log(cookies);
  }

  handleTagClick = (id) => {
    ajax.post(API_URL + "tags/similar/" + id).then(response => {
      this.setState({bookmarks: response.data, chartClicked: false});
    }).catch(error => {
      console.log(error);
    })
  }
  projectFilter = (projectName) => {
    const payload = {name: projectName};
    ajax.post(API_URL + "projects/retrieveProjectBookmarks", payload).then(response => {
      this.setState({bookmarks: response.data, chartClicked: false});
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    const {classes} = this.props;
    const {bookmarks} = this.props;
    return (
      <div className={classes.root} style={{width: "100%", margin: 0}}>
      
        {this.state.isLoading? (
          <Loader/>
        ) : (
          <ApplicationBar onBookmarkAdd={this.props.loadBookmarks} isAuthenticated={this.state.isAuthenticated} 
                          currentUser={{...this.state.currentUser}} onProjectAdd={this.loadProjects}/>
        )}  
        
        {/*
        <SideBar 
          loadBookmarks={this.props.loadBookmarks} 
          tags={this.state.tags} 
          projects={this.state.projects} 
          onTagClick={this.handleTagClick}
          onProjectClick={this.projectFilter}/> 
        */}
        <SideBarContainer/>
        <BookmarkContainer/>
        {/*
        <div className={classes.appBarSpacer}/>
          <Paper className={classes.container}>
          {this.state.chartClicked? (<Chart tags={this.state.tags}/>) 
          : (<div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={15}>
                  {(bookmarks || []).map(bookmark => (
                    <Grid item sm={6} md={4} lg={4} key={bookmark.id}>
                      <Bookmark 
                        key={bookmark.name}
                        tags={bookmark.tags} 
                        containerRemove={this.handleDeleteBookmark} 
                        url={bookmark.url} 
                        title={bookmark.name} 
                        projects={this.state.projects}/>
                    </Grid>
                  ))}
                </Grid>
              </div>) }
          </Paper> */}
        </div>        
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashBoard);
