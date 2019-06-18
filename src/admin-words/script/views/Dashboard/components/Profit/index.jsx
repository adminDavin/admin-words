import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import { AttachMoney as AttachMoneyIcon } from '@material-ui/icons';

// Shared components
import { Paper } from 'common/components';

// Component styles
import styles from './styles';

class Profit extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              用户活跃状态
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              活跃
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <AttachMoneyIcon className={classes.icon} />
          </div>
        </div>
      </Paper>
    );
  }
}

Profit.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profit);
