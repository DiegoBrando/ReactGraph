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
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import {useHistory} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});






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




  return <EditLocationPageComponent locationid={props.history.location.state.locationid} history={history} locationname={props.history.location.state.locationname} latitude={props.history.location.state.latitude}  longitude={props.history.location.state.longitude} changelocation={changelocation} deletelocation={deletelocation} />
}

class EditLocationPageComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = {locationid: this.props.locationid, history:this.props.history, locationname:this.props.locationname, latitude:this.props.latitude, longitude:this.props.longitude, changelocation:this.props.changelocation , deletelocation:this.props.deletelocation};
}




  render(){
    return (
      <form noValidate autoComplete="off">
      <div>
       <Button onClick={(event)=>{this.props.history.goBack()}}>GoBack</Button>
      <TextField required ref="LocationName" label="LocationName" defaultValue={this.state.locationname} onChange={(event)=>{this.setState({locationname:event.target.value});}}/>
      <TextField required ref="Latitude" label="Latitude" defaultValue={this.state.latitude} onChange={(event)=>{this.setState({latitude:event.target.value});}}/>
      <TextField required ref="Longitude" label="Longitude" defaultValue={this.state.longitude} onChange={(event)=>{this.setState({longitude:event.target.value});}}/>

       <Button onClick={(event)=>{this.props.changelocation({variables:{locationid:this.state.locationid, locationname:this.state.locationname,latitude:parseFloat(this.state.latitude),longitude:parseFloat(this.state.longitude)}}); this.state.history.goBack();}}>Submit</Button>
       <Button onClick={(event)=>{this.props.deletelocation({variables:{locationid:this.state.locationid, locationname:this.state.locationname}}); this.state.history.goBack();}}>Delete</Button>


   </div>
   </form>

    );
  }
}

export default EditLocationPage
