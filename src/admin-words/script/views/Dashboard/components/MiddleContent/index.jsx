import React, { Component } from 'react';

// Externals
// import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Component styles
import styles from './styles';

class Users extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.content}>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
