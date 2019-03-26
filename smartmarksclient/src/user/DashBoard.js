import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ApplicationBar from "../shared/AppBar";
import Typography from "@material-ui/core/Typography";
import SideBar from "../sidebar/SideBar";
import history from "../history";
import {ACCESS_TOKEN, API_URL} from "../constants/constants";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ajax} from "../utils/API";
import Loader from "@material-ui/core/CircularProgress";
import BookmarkContainer from "../bookmarks/BookmarkContainer";

const styles = (theme) => ({
  button: {
    margin:theme.spacing.unit
  },
  title: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing.unit * 3,
    marginLeft: 200,
    marginTop: "10vh",
    overflow: "auto",
    height: "89vh",
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
  state = {
    currentUser: undefined,
    isAuthenticated: false,
    isLoading: true,
  };
  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.isAuthenticated = false;
    this.props.currentUser = null;
    history.push("/");
  }
  componentDidMount() {
    ajax.get(API_URL + "users/user/me").then(response => {
      this.setState(
        {currentUser: response.data,
         isAuthenticated: true,
        isLoading: false})
    }).catch(error => {
      console.log(error)
    })
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root} style={{width: "100%", margin: 0}}>
      <Grid container>
        <Grid item sm={12}>
        {this.state.isLoading? (
          <Loader/>
        ) : (
          <ApplicationBar isAuthenticated={this.state.isAuthenticated} currentUser={{...this.state.currentUser}}/>
        )}  
        </Grid>
        <Grid item lg={3} sm={12}>  
          <SideBar/>
        </Grid> 
        <Grid item lg={12}>
        <div className={classes.appBarSpacer}/>
          <Paper className={classes.container}>
            <BookmarkContainer/>
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashBoard);
