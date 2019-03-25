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
    height: "80vh",
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
    currentUser: null,
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
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
              facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
              donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
              imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
              arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
              donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
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
