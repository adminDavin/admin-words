import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'common/layouts';

// Custom components
import { Users } from './components';


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(1) * 4
  },
  item: {
    height: '100%'
  }
});

class Dashboard extends Component {
  render() {
    const {classes} = this.props;

    return (
        <DashboardLayout className={ classes.root }>
          <Grid>
            <Users className={ classes.item } />
          </Grid>
        </DashboardLayout>
      );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
