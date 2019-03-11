import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  form: {
    marginTop: theme.spacing.unit * 3,
  },
});



const Login = (props) => {
  const {classes} = props;
  return (
    <div>
      <form className={classes.form} onSubmit={props.handleSubmit}>
        
        <FormControl required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" value={props.email} onChange={props.textChange} autoFocus />
        </FormControl>
        <FormControl required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input name="password" onChange={props.textChange} value={props.password} type="password" id="password"/>
        </FormControl>
        {props.register && (
          <FormControl required fullWidth>
            <InputLabel htmlFor="repeat password">Password</InputLabel>
            <Input name="repeat" onChange={props.textChange} value={props.repeat} type="password" id="repeat"/>
          </FormControl>
        )}
        {!props.register && (
          <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        )}       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {props.register? ("Register!") : ("Sign in")}
        </Button>
      </form>
    </div>
  );
}     

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);