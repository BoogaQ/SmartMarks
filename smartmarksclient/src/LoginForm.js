import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grow from "@material-ui/core/Grow";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Login from "./Login";
import Paper from '@material-ui/core/Paper';
import Register from "./Register";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";
import Background from "./Images/login-background.jpg";

const styles = theme => ({
  main: {
    width: 'auto',
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  background: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit*2,
    backgroundColor: theme.palette.secondary.main,
  },
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      repeat: "",
    }
    this.onChangeText = this.onChangeText.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
  }
  onChangeText = (event) => {
    const newState = {...this.state};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    const {classes} = this.props;
    return (
      <main className={classes.main}>
      <Paper className={classes.paper}>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Login"/>
          <Tab label="Register"/>
        </Tabs>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {this.state.value==0? (
          <Login handleSubmit={this.handleSubmit} textChange={this.onChangeText}/>
        ) : (<Register/>)}
      </Paper>
    </main>
    );
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn);