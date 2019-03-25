import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import ApplicationBar from "../shared/AppBar";
import Typography from "@material-ui/core/Typography";
import SideBar from "../sidebar/SideBar";
import history from "../history";
import {ACCESS_TOKEN} from "../constants/constants";
;
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  button: {
    margin:theme.spacing.unit
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginLeft: -130,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    height: "100%",
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
    isAuthenticated: true,
  };
  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.isAuthenticated = false;
    this.props.currentUser = null;
    history.push("/");
  }
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root} style={{width: "100%", margin: 0}}>
        <ApplicationBar isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser}/>     
          <SideBar/>
          <main className={classes.content}>
            <div className={classes.toolbar} />
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
        </main>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashBoard);
