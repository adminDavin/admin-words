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
import { DocumentCount, MiddleContent, WordsCount, Profit, WordsChart, HighFrequencyWords, DocumentList} from './components';

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
      <DashboardLayout title="大盘分析">
        <div className={ classes.root }>
          <Grid container spacing={ 4 }>
            <Grid item lg={ 3 } sm={ 6 } xl={ 3 } xs={ 12 }>
              <DocumentCount className={ classes.item } />
            </Grid>
            <Grid item lg={ 3 } sm={ 6 } xl={ 3 } xs={ 12 }>
              <MiddleContent className={ classes.item } />
            </Grid>
            <Grid item lg={ 3 } sm={ 6 } xl={ 3 } xs={ 12 }>
              <WordsCount className={ classes.item } />
            </Grid>
            <Grid item lg={ 3 } sm={ 6 } xl={ 3 } xs={ 12 }>
              <Profit className={ classes.item } />
            </Grid>
            <Grid item lg={ 12 } md={ 12 } xl={ 12 } xs={ 12 }>
              <WordsChart className={ classes.item } />
            </Grid>
            <Grid item lg={ 4 } md={ 6 } xl={ 3 } xs={ 12 }>
              <HighFrequencyWords className={ classes.item } />
            </Grid>
            <Grid item lg={ 8 } md={ 12 } xl={ 9 } xs={ 12 }>
              <DocumentList className={ classes.item } />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
      );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
