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








  return <AddLocationPageComponent history={history} locationname="" latitude={0.0}  longitude={0.0} addlocation={addlocation} />
}

class AddLocationPageComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = { history:this.props.history, locationname:this.props.locationname, latitude:this.props.latitude, longitude:this.props.longitude, addlocation:this.props.addlocation };
}




  render(){
    return (
      <form noValidate autoComplete="off">
      <div>
       <Button onClick={(event)=>{this.props.history.goBack()}}>GoBack</Button>
      <TextField required ref="LocationName" label="LocationName" defaultValue={this.state.locationname} onChange={(event)=>{this.setState({locationname:event.target.value});}}/>
      <TextField required ref="Latitude" label="Latitude" defaultValue={this.state.latitude} onChange={(event)=>{this.setState({latitude:event.target.value});}}/>
      <TextField required ref="Longitude" label="Longitude" defaultValue={this.state.longitude} onChange={(event)=>{this.setState({longitude:event.target.value});}}/>

       <Button onClick={(event)=>{this.props.addlocation({variables:{locationname:this.state.locationname,latitude:this.state.latitude,longitude:this.state.longitude}}); this.state.history.goBack();}}>Submit</Button>


   </div>
   </form>

    );
  }
}

export default AddLocationPage
