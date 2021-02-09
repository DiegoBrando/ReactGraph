import React, { useState }  from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import useStyles from '../styling.js'
const GET_LOCATION = gql`
query locationbyid($id:ID!){
  locationbyid(id:$id){
    locationname
     locationid
     latitude
     longitude
	}
}
`


function LocationInfo(props){
  const history = useHistory();
const classes = useStyles();

  const { loading, error, data } = useQuery(GET_LOCATION,{variables:{'id':props.locationid}})
  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>

  return <LocationInfoComponent locationinfo={data} history={history} classes={classes}/>

}

class LocationInfoComponent extends React.Component {

    constructor(props) {
    super(props);
    this.state = {locationinfo: this.props.locationinfo, history:this.props.history, classes:this.props.classes};
  }



  render(){
    return (
      <React.Fragment>
      <Container maxWidth="lg" >
      <Grid container spacing={3} className={this.state.classes.container}>
      <Grid item xs={12} md={9} lg={9}>
      <Paper>
  <Typography component="h2" variant="h6" color="primary" gutterBottom>{this.state.locationinfo.locationbyid[0].locationname}</Typography>
  </Paper>
  </Grid>


  <Grid item xs={12} md={9} lg={9}>
  <Paper>
  <Typography color="textSecondary"> {this.state.locationinfo.locationbyid[0].latitude }       {this.state.locationinfo.locationbyid[0].longitude}</Typography>
</Paper>
  </Grid>


  <Grid item xs={12} md={9} lg={9}>
  <Paper>
  <Button onClick={(event)=>{console.log(this.state.locationinfo.locationbyid[0].locationid); this.state.history.push({pathname:'/EditLocation',state:{locationid:this.state.locationinfo.locationbyid[0].locationid,locationname:this.state.locationinfo.locationbyid[0].locationname, latitude:this.state.locationinfo.locationbyid[0].latitude,longitude:this.state.locationinfo.locationbyid[0].longitude}}); }}>Edit Location Details</Button>
</Paper>
  </Grid>

</Grid>
</Container>

      </React.Fragment>


    )}





}


export default LocationInfo
