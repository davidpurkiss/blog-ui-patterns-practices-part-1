import React, { Component, Fragment } from 'react';
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

class PasswordManager extends Component {
  state = {
    selectedCategory: AzkabanService.categories[0]
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div style={{ marginLeft: 25, marginRight: 25 }}>
        <Grid
          container
          direction="row"
          style={{ marginTop: 50 }}
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={10}>
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
          <Grid item xs={2}>
            <Button variant="contained" color="primary">
              <Icon style={{ marginRight: 10 }}>add</Icon>
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ marginTop: 15 }} />
            <List dense={false}>
              <ListItem>
                <ListItemText primary="Amazon" secondary="Category: Sites" />
                <ListItemSecondaryAction>
                  <IconButton aria-label="View">
                    <Icon>filter_none</Icon>
                  </IconButton>
                  <IconButton aria-label="Edit">
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton aria-label="Delete">
                    <Icon>delete</Icon>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PasswordManager;
