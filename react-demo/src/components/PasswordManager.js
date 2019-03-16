import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { AzkabanService } from '../services/AzkabanService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class PasswordManager extends Component {
  state = {
    selectedCategory: AzkabanService.categories[0]
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addNewPassword() {
    this.props.history.push('/password');
  }

  editExistingPassword(id) {
    this.props.history.push(`/password/${id}`);
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
          <div style={{ marginLeft: 25, marginRight: 25 }}>
            <Grid
              container
              direction="row"
              style={{ marginTop: 50 }}
              alignItems="center"
              justify="space-between"
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
                      Passwords
                    </Typography>
                    <Typography component="h2" variant="subheading">
                      View and Manage all your passwords
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FormControl style={{ minWidth: 120 }}>
                  <InputLabel htmlFor="category-simple">Category</InputLabel>
                  <Select
                    value={this.state.selectedCategory}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'selectedCategory',
                      id: 'category-simple'
                    }}
                  >
                    {AzkabanService.categories.map(category => (
                      <MenuItem key={category.id} value={category}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    View passwords in specific categories.
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.addNewPassword()}
                >
                  <Icon style={{ marginRight: 10 }}>add</Icon>
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginTop: 15 }} />
                <List dense={false}>
                  {AzkabanService.passwords.map(password => (
                    <ListItem>
                      <ListItemText
                        primary={password.appName}
                        secondary={password.appUrl}
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="View">
                          <Icon>filter_none</Icon>
                        </IconButton>
                        <IconButton
                          aria-label="Edit"
                          onClick={() => this.editExistingPassword(password.id)}
                        >
                          <Icon>edit</Icon>
                        </IconButton>
                        <IconButton aria-label="Delete">
                          <Icon>delete</Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PasswordManager);
