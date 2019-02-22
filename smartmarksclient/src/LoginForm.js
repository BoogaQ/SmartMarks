import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";
import Background from "./Images/login-background.jpg";
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Login from "./Login";
import Paper from '@material-ui/core/Paper';
import {Redirect} from "react-router-dom"
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";


const styles = theme => ({
  main: {
    width: 'auto',
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: 400,
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
  }
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      email: "",
      password: "",
      repeat: "",
      authenticated: false
    }
    this.onChangeText = this.onChangeText.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({value});
  };
  
  submitForm = (event) => {
    console.log(event.target);
    event.preventDefault();
    const {email, password} = this.state;
    if (!email || !password) return;
    axios.post("http://localhost:8080/api/login", {
      "email": email,
      "password": password,
    })
    .then((response) => {
      if (!response.data.error) {
        this.setState({authenticated: true});
        this.props.history.push("/");
      }
    })

  };
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
        <CssBaseline />
        <Typography component="h1" variant="h5">
          {this.state.value===0? ("Sign in") : ("Register")}
        </Typography>
        {this.state.value===0? (
          <Login register={false} handleSubmit={this.submitForm} textChange={this.onChangeText}
           email={this.state.email} password={this.state.password} repeat={this.state.repeat}/>
        ) : (
          <Login register={true} handleSubmit={this.submitForm} textChange={this.onChangeText}
           email={this.state.email} password={this.state.password} repeat={this.state.repeat}/>
        )}
      </Paper>
    </main>
    );
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignIn);