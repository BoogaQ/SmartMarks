import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  }
});


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    }
  };

  handleSubmit = (event) => {
    console.log(event.target);
    event.preventDefault();
    const {email, password} = this.state;
    if (!email || !password) return;
    console.log({"email":email, "password":password});
  };

  onChangeText = (event) => {
    const newState = {...this.state};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    console.log(newState[event.target.name]);
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" value={this.state.email} onChange={this.onChangeText} autoFocus />
          </FormControl>
          <FormControl required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" onChange={this.onChangeText} value={this.state.password} type="password" id="password"/>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </div>
    );
  }     
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);