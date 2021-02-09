import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client';

import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import Drawer from '@material-ui/core/Drawer';
import {useHistory} from 'react-router-dom';
import SideBar from './Widgets/SideBar.js'
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styling.js'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import GridPaperComponent from './Widgets/GridPaper.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";







const CHANGE_LOCATION = gql`
   mutation ChangeLocation($locationid: ID!, $locationname: String!, $latitude: Float!, $longitude: Float!){
      ChangeLocation(locationid: $locationid, locationname:$locationname, latitude:$latitude,longitude:$longitude){
        locationid
        locationname

  }
}
`


const DELETE_LOCATION = gql`
   mutation DeleteLocation($locationid: ID!, $locationname: String!){
      DeleteLocation(locationid: $locationid, locationname:$locationname){
        locationid
        locationname

  }
}
`

function SayNo(){
  {console.log('NO')}
}






function EditLocationPage(props){
  const history = useHistory();
  const classes = useStyles();
    const[changelocation,{datam}]= useMutation(CHANGE_LOCATION)
    const[deletelocation,{datan}]= useMutation(DELETE_LOCATION)




  return <EditLocationPageComponent locationid={props.history.location.state.locationid} history={history} locationname={props.history.location.state.locationname} latitude={props.history.location.state.latitude}  longitude={props.history.location.state.longitude} changelocation={changelocation} deletelocation={deletelocation} classes={classes} />
}

class EditLocationPageComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = {locationid: this.props.locationid, history:this.props.history, locationname:this.props.locationname, latitude:this.props.latitude, longitude:this.props.longitude, changelocation:this.props.changelocation , deletelocation:this.props.deletelocation, open:false,width:100, classes:this.props.classes};
}
handleToggle = () => this.setState({open: !this.state.open});


changesize() {

   if(this.state.open){
     this.setState({width:100})
   }
   else{
     this.setState({width:250})
   }

 }


 changeopen(open) {

 this.setState({open:open})

 }

  render(){
    return (
      <React.Fragment>


<SideBar locationid={this.state.locationid} classes={this.state.classes} open={this.state.open} handletoggle={this.handleToggle.bind(this)} statesetting={this.changesize.bind(this)} changeopen={this.changeopen.bind(this)}/>




           <div style={{marginLeft:this.state.width}} >
           <Container maxWidth="lg" >
      <form noValidate autoComplete="off">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>{this.state.locationname}</Typography>


      <GridPaperComponent component={<TextField required ref="LocationName" label="LocationName" defaultValue={this.state.locationname} onChange={(event)=>{this.setState({locationname:event.target.value});}}/>}/>


      <GridPaperComponent component={<TextField required ref="Latitude" label="Latitude" defaultValue={this.state.latitude} onChange={(event)=>{this.setState({latitude:event.target.value});}}/>}/>



            <GridPaperComponent component={<TextField required ref="Longitude" label="Longitude" defaultValue={this.state.longitude} onChange={(event)=>{this.setState({longitude:event.target.value});}}/>}/>



      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
       <Button onClick={(event)=>{this.props.changelocation({variables:{locationid:this.state.locationid, locationname:this.state.locationname,latitude:parseFloat(this.state.latitude),longitude:parseFloat(this.state.longitude)}}); this.state.history.goBack();}}>Submit</Button>
       <Button onClick={(event)=>{this.props.deletelocation({variables:{locationid:this.state.locationid, locationname:this.state.locationname}}); this.state.history.goBack();}}>Delete</Button>
       </Paper>
       </Grid>
       </form>
       </Container>
   </div>
     </React.Fragment>

    );
  }
}

export default EditLocationPage
