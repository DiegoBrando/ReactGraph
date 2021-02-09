import React, { useState }  from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../styling.js'

class GridPaperComponent extends React.Component {

    constructor(props) {
    super(props);
    this.state = {component: this.props.component };
  }



  render(){
    return (
      <React.Fragment>
      <Grid item xs={12} md={9} lg={9}>
      <Paper className={{
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      }}>
  {this.state.component}
  </Paper>
  </Grid>
      </React.Fragment>


    )}





}

export default GridPaperComponent
