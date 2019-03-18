import React, { Component, Fragment } from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';
import { AzkabanService } from '../services/AzkabanService';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SIGN_IN_STATE_READY = 'READY';
const SIGN_IN_STATE_IN_PROGRESS = 'IN_PROGRESS';
const SIGN_IN_STATE_ERROR = 'ERROR';
const SIGN_IN_STATE_SUCCESS = 'SUCCESS';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    rememberMe: false,
    signInState: SIGN_IN_STATE_READY,
    error: ''
  };

  handleValueChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleCheckedChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  signIn = () => {
    this.setState({ signInState: SIGN_IN_STATE_IN_PROGRESS });

    AzkabanService.signIn(this.state.email, this.state.password)
      .then(() => {
        this.setState({ signInState: SIGN_IN_STATE_SUCCESS });
        setTimeout(() => {
          this.props.history.push('/passwords');
        }, 750);
      })
      .catch(error => {
        this.setState({ signInState: SIGN_IN_STATE_ERROR, error: error });
      });
  };

  render() {
    const title = 'Azkaban - Password Manager';
    const logo =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='200' height='200' version='1.1' viewBox='0 0 800.00001 800.00001' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cmask id='a' maskUnits='userSpaceOnUse'%3E%3Ccircle cx='400' cy='400' r='400' color='%23000000' color-rendering='auto' fill='%23fff' image-rendering='auto' shape-rendering='auto' solid-color='%23000000' style='isolation:auto;mix-blend-mode:normal'/%3E%3C/mask%3E%3ClinearGradient id='b' x1='291.14' x2='27.94' y1='440.49' y2='666.76' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-opacity='.42' offset='0'/%3E%3Cstop stop-opacity='0' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(0 -252.36)'%3E%3Ccircle cx='400' cy='652.36' r='400' color='%23000000' color-rendering='auto' fill='%231c8adb' image-rendering='auto' shape-rendering='auto' solid-color='%23000000' style='isolation:auto;mix-blend-mode:normal'/%3E%3Cpath transform='translate(0 252.36)' d='m191.35 226.75-191.13 191.13c8.3675 198.71 112.21 310.9 272.72 371.72 72.418-72.1 144.67-144.35 216.64-217.35z' fill='url(%23b)' fill-rule='evenodd' mask='url(%23a)'/%3E%3Cpath d='m400 418.03c-68.55 33.477-145.63 60.635-208.65 61.081 38.706 239.37 60.915 331.87 208.65 407.59 147.74-75.717 169.95-168.22 208.65-407.59-63.019-0.44559-140.1-27.604-208.65-61.081z' fill='%23fff' fill-rule='evenodd'/%3E%3Cpath transform='translate(0 252.36)' d='m400 165.66v234.34h175.93c11.796-47.668 21.583-104.35 32.725-173.26-63.019-0.44559-140.1-27.601-208.65-61.078zm0 234.34h-175.93c29.182 117.93 70.72 180.41 175.93 234.33v-234.33z' fill-opacity='.13473' fill-rule='evenodd'/%3E%3C/g%3E%3C/svg%3E%0A";
    const { signInState, error } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 50, textAlign: 'center' }}
        spacing={16}
      >
        <Grid item xs={12}>
          <Typography component="h2" variant="display1">
            Welcome to {title}!
          </Typography>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ marginTop: 25 }}
          />
        </Grid>
        {signInState === SIGN_IN_STATE_READY && (
          <Fragment>
            <Grid item xl={2} lg={4} md={4} sm={6} xs={8}>
              <Grid item>
                <form autoComplete="off">
                  <TextField
                    label="Email Address"
                    value={this.state.email}
                    onChange={this.handleValueChange('email')}
                    type="email"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="material-icons">email</i>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleValueChange('password')}
                    type="password"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon>lock</Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.rememberMe}
                        onChange={this.handleCheckedChange('rememberMe')}
                        value="rememberMe"
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                </form>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <a href="#reset">Forgot your password?</a> (Use user:pass)
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: 50 }}
                onClick={() => this.signIn()}
              >
                <Icon style={{ marginRight: 10 }}>security</Icon>
                Sign In
              </Button>
            </Grid>
          </Fragment>
        )}
        {signInState === SIGN_IN_STATE_IN_PROGRESS && (
          <Fragment>
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="title">
                You are being signed in.
              </Typography>
              <Typography component="h4" variant="subheading">
                Please wait...
              </Typography>
            </Grid>
          </Fragment>
        )}
        {signInState === SIGN_IN_STATE_ERROR && (
          <Fragment>
            <Grid item xs={12}>
              <Icon color="error" fontSize="large" style={{ marginRight: 10 }}>
                error
              </Icon>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="title">
                {error}
              </Typography>
              <Typography component="h4" variant="subheading">
                Please try again or <a href="#reset">reset your password</a>.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: 25, marginBottom: 50 }}
                onClick={() =>
                  this.setState({ signInState: SIGN_IN_STATE_READY })
                }
              >
                Try again
              </Button>
            </Grid>
          </Fragment>
        )}
        {signInState === SIGN_IN_STATE_SUCCESS && (
          <Fragment>
            <Grid item xs={12}>
              <Icon
                color="primary"
                fontSize="large"
                style={{ marginRight: 10 }}
              >
                check_circle_outline
              </Icon>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="title">
                You have signed in successfully.
              </Typography>
              <Typography component="h4" variant="subheading">
                You're on the way to managing your passwords.
              </Typography>
            </Grid>
          </Fragment>
        )}
      </Grid>
    );
  }
}

export default withRouter(SignIn);
