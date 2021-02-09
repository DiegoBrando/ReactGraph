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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";







const ADD_LOCATION = gql`
   mutation SubmitLocation( $locationname: String!, $latitude: Float!, $longitude: Float!){
      SubmitLocation( locationname:$locationname, latitude:$latitude,longitude:$longitude){
        locationid
        locationname

  }
}
`




function SayNo(){
  {console.log('NO')}
}






function AddLocationPage(props){
  const history = useHistory();
  const classes = useStyles();
    const[addlocation,{datam}]= useMutation(ADD_LOCATION)








  return <AddLocationPageComponent history={history} locationname="" latitude={0.0}  longitude={0.0} addlocation={addlocation} classes={classes} />
}

class AddLocationPageComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = { history:this.props.history, locationname:this.props.locationname, latitude:this.props.latitude, longitude:this.props.longitude, addlocation:this.props.addlocation, classes:this.props.classes, width:100, open:false };
}


handleToggle = () => this.setState({open: !this.state.open});


  render(){
    return (
      <React.Fragment>
      <Drawer
        variant="permanent"
        docked={false}

        open={this.state.open}
          onRequestChange={(open) => {this.setState({open});}}
        classes={{
          paper: clsx(this.state.classes.drawerPaper, !this.state.open && this.state.classes.drawerPaperClose),

        }}
        >
        <div className={this.state.classes.toolbarIcon}>
        <Button
          onClick={(event)=>{this.handleToggle(); if(this.state.open){this.setState({width:100})} else{this.setState({width:250})} console.log(this.state.width)}}
        >
        <MenuIcon/>
        </Button>
        </div>

      <List>
      <ListItem button onClick={(event)=>{this.state.history.goBack(); }}>
        <ListItemIcon>
          <KeyboardReturnIcon />
        </ListItemIcon>
        <ListItemText primary="GoBack" />
      </ListItem>
      </List>
           </Drawer>
           <div style={{marginLeft:this.state.width}} >
           <Container maxWidth="lg" >
      <form noValidate autoComplete="off">

      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
      <TextField required ref="LocationName" label="LocationName" defaultValue={this.state.locationname} onChange={(event)=>{this.setState({locationname:event.target.value});}}/>
      </Paper>
      </Grid>

      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
      <TextField required ref="Latitude" label="Latitude" defaultValue={this.state.latitude} onChange={(event)=>{this.setState({latitude:event.target.value});}}/>
      </Paper>
      </Grid>


      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
      <TextField required ref="Longitude" label="Longitude" defaultValue={this.state.longitude} onChange={(event)=>{this.setState({longitude:event.target.value});}}/>
      </Paper>
      </Grid>


            <Grid item xs={12} md={9} lg={9}>
            <Paper className={this.state.classes.paper}>
       <Button onClick={(event)=>{this.props.addlocation({variables:{locationname:this.state.locationname,latitude:parseInt(this.state.latitude),longitude:parseInt(this.state.longitude)}}); this.state.history.goBack();}}>Submit</Button>
       </Paper>
       </Grid>
</form>
</Container>
   </div>

   </React.Fragment>

    );
  }
}

export default AddLocationPage
