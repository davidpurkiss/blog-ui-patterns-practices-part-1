import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import { AzkabanService } from '../services/AzkabanService';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class PasswordDetails extends Component {
  state = {
    appName: '',
    appUrl: '',
    category: 1, // Site
    username: '',
    password: '',
    isSaving: false
  };

  componentDidMount() {
    if (!this.isNew()) {
      this.setState(AzkabanService.getPassword(this.getId()));
    }
  }

  handleValueChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save() {
    this.setState({ isSaving: true });
    if (this.isNew()) {
      AzkabanService.addPassword(this.state).then(() => {
        this.setState({ isSaving: false });
        this.navigateToPasswords();
      });
    } else {
      AzkabanService.updatePassword(this.getId(), this.state).then(() => {
        this.setState({ isSaving: false });
        this.navigateToPasswords();
      });
    }
  }

  cancel() {
    this.navigateToPasswords();
  }

  navigateToPasswords() {
    this.props.history.push('/passwords');
  }

  getId() {
    return this.props.match.params.id;
  }

  isNew() {
    return this.getId() === undefined;
  }

  render() {
    const isNew = this.isNew();
    const { isSaving } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginLeft: 25, marginRight: 25 }}
      >
        <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
          <Grid
            container
            direction="row"
            style={{ marginTop: 30 }}
            spacing={24}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={16}
              >
                <Grid item>
                  <Icon fontSize="large">shield</Icon>
                </Grid>
                <Grid item>
                  <Typography component="h2" variant="title">
                    {isNew ? 'Add new ' : 'Edit '}Password
                  </Typography>
                  <Typography component="h2" variant="subheading">
                    {isNew
                      ? 'Add a new password for an app or website.'
                      : 'Change the details for your existing password.'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {isSaving && (
              <Grid
                container
                justify="center"
                style={{ textAlign: 'center', marginTop: 15 }}
              >
                <Grid item xs={12}>
                  <Typography component="h2" variant="title">
                    Saving Password...
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}
            {!isSaving && (
              <Fragment>
                <Grid item xs={12}>
                  <form autoComplete="off">
                    <TextField
                      required
                      name="appName"
                      label="App/Site Name"
                      value={this.state.appName}
                      onChange={this.handleValueChange('appName')}
                      fullWidth
                    />
                    <TextField
                      name="appUrl"
                      label="App/Site Url"
                      value={this.state.appUrl}
                      onChange={this.handleValueChange('appUrl')}
                      helperText="Leave blank if not applicable"
                      fullWidth
                    />
                    <FormControl style={{ minWidth: 120, marginTop: 10 }}>
                      <InputLabel htmlFor="category-simple">
                        Category
                      </InputLabel>
                      <Select
                        value={this.state.category}
                        onChange={this.handleSelectChange}
                        inputProps={{
                          name: 'category',
                          id: 'category-simple'
                        }}
                      >
                        {AzkabanService.categories
                          .filter(category => category.id !== 0)
                          .map(category => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <TextField
                      name="username"
                      label="Username"
                      value={this.state.username}
                      onChange={this.handleValueChange('username')}
                      fullWidth
                    />
                    <TextField
                      required
                      name="password"
                      label="Password"
                      value={this.state.password}
                      onChange={this.handleValueChange('password')}
                      fullWidth
                      type="password"
                    />
                  </form>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item />
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.cancel()}
                        style={{ marginRight: 15 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.save()}
                      >
                        <div> {isNew ? 'Add' : 'Save'} </div>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default PasswordDetails;
