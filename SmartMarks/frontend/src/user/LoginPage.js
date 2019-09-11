import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ajax} from "../utils/API";
import {ACCESS_TOKEN, API_URL} from "../constants/constants";
import Snackbar from '@material-ui/core/Snackbar';
import Wrapper from "../shared/notification";

const styles = theme => ({
  main: {
    marginTop: 150,
    width: 'auto',
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: 400,
  },
  button: {
    height: 100,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#dee3ea",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    height: 300,
  },
  avatar: {
    margin: theme.spacing.unit*2,
    backgroundColor: "black",
  },
  submit: {
    marginTop: 20,
  }
});

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "",
        password: "",
      },
      notification: {
        open: false,
        variant: "success",
        message: "error",
      }
    }
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNotification = this.handleNotification.bind(this);
    this.handleNotificationClose = this.handleNotificationClose.bind(this);
  }
  handleNotification = () => {
    this.setState({notification: {open: true}})
  }
  handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({notification: {open: false, variant:this.state.notification.variant, message: "empty"}});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {user} = this.state;
    const loginRequest = {"usernameOrEmail": user.email, "password": user.password};
    ajax.post(API_URL + "auth/login", loginRequest)
    .then((response) => {
      console.log("Access token: " + response.data.accessToken);
      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      this.setState({notification: {open: true, variant: "success", message: "Logged in successfully."}});
      this.props.onLogin();
    }).catch((error) => {
      this.setState({notification: {open: true, variant: "error", message: "Invalid username or password."}});
    })
    
  };

  handleChange = (event) => {
    const newState = {...this.state};
    newState.user[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    const {classes} = this.props;
    const {user} = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          > 
            <FormControl required fullWidth>
              <TextValidator
                label="Email"
                onChange={this.handleChange}
                name="email"
                value={user.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid.']}
              />
            </FormControl>
            <FormControl required fullWidth>
              <TextValidator
                label="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                value={user.password}
                validators={['required', 'minStringLength:6', 'maxStringLength:20']}
                errorMessages={['This field is required', 'Password must be between 6 and 20 characters.', 'Password must be between 6 and 20 characters.']}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Sign In"}
            </Button>
          </ValidatorForm>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.notification.open}
          autoHideDuration={6000}
          onClose={this.handleNotificationClose}
        >
          <Wrapper
            onClose={this.handleNotificationClose}
            variant={this.state.notification.variant}
            message={this.state.notification.message}
          />
        </Snackbar>
      </main>
    )};
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginPage);