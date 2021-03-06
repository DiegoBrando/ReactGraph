import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client';
import useStyles from '../styling.js'
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import SideBar from './SideBar.js'
import {useHistory} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




const GET_LOCATIONS = gql`
{
  locations{
  locationname
  locationid

}
}
`

function SayNo(){
  {console.log('NO')}
}






function LocationPicker(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_LOCATIONS)



  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log(data);

  return <LocationPickerComponent locations={data} history={history} locationid={props.locationid} settingstate={props.settingstate} classes={classes}/>
}

class LocationPickerComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = {locations: this.props.locations, history:this.props.history, locationid:this.props.locationid, settingstate:this.props.settingstate, classes:this.props.classes};
}




  render(){
    console.log(this.state.locationid)
    return (
      <React.Fragment>
<Grid item xs={12} md={9} lg={9}>

<TextField
       select
       label="Select"
       fullWidth={true}
       defaultValue={this.state.locationid}
       onChange={e=>{this.setState({locationid:e.target.value}); this.state.settingstate(e.target.value); console.log(e.target.value);}}

     >
     {this.state.locations.locations.map((location) => (
           <MenuItem key={location.locationid} value={location.locationid}>
             {location.locationname}
           </MenuItem>
         ))}
       </TextField></Grid>
      </React.Fragment>
    );
  }
}

export default LocationPicker
