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
import {signup} from "../utils/API";
import Snackbar from '@material-ui/core/Snackbar';
import Wrapper from "../shared/notification";
import {ACCESS_TOKEN, API_URL} from "../constants/constants";

const styles = theme => ({
  main: {
    marginTop: 150,
    width: 'auto',
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: 500,
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
    height: 400,
  },
  avatar: {
    margin: theme.spacing.unit*2,
    backgroundColor: "black",
  },
  submit: {
    marginTop: 30,
  }
});

class RegistrationPage extends React.Component {
  constructor() {
    super();
    this.state = {
			user: {
				username: "",
				email: "",
				password: "",
				repeatPassword: "",
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
		const registrationRequest = {"username": user.username, "email": user.email, "password": user.password};
    signup(registrationRequest)
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      this.setState({notification: {
        open: true, 
        variant: "success", 
        message: "Registration successful."}
      });		
    }).catch(error => {
      console.log(error.response);
			this.setState({notification: {
				open: true, 
				variant: "error", 
				message: error.response.data.message}});
		})
  };

  handleChange = (event) => {
    const newState = {...this.state};
    newState.user[event.target.name] = event.target.value;
    this.setState(newState);
	}
	
	componentDidMount() {
		ValidatorForm.addValidationRule('passwordMatching', (value) => {
			if (value !== this.state.user.password) {
					return false;
			}
			return true;
	});
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
            Register
          </Typography>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          > 
            <FormControl required fullWidth>
              <TextValidator
                label="Username"
                name="username"
                validators={['required', 'minStringLength:6', 'maxStringLength:20']}
								errorMessages={['This field is required', 'Password must be between 6 and 20 characters.', 'Password must be between 6 and 20 characters.']}
								value={user.username}
								onChange={this.handleChange}
              />
            </FormControl>
            <FormControl required fullWidth>
              <TextValidator
                label="Email"
                name="email"           
                validators={['required', 'isEmail']}
								errorMessages={['This field is required', 'Email is not valid.']}
								value={user.email}
								onChange={this.handleChange}
              />
            </FormControl>
            <FormControl required fullWidth>
              <TextValidator
                label="Password"  
								name="password"
								type="password"
                validators={['required', 'minStringLength:6', 'maxStringLength:20']}
								errorMessages={['This field is required', 'Password must be between 6 and 20 characters.', 'Password must be between 6 and 20 characters.']}
								value={user.password}
								onChange={this.handleChange}

              />
            </FormControl>
            <FormControl required fullWidth>
              <TextValidator
                label="Repeat password"
								name="repeatPassword"
								type="password"
                validators={['passwordMatching', 'required']}
                errorMessages={['Passwords do not match.', 'This field is required']}
                value={user.repeatPassword}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {"Sign up!"}
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

RegistrationPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RegistrationPage);