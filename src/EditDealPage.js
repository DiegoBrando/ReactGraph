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



const GET_LOCATIONS = gql`
{
  locations{
  locationname
  locationid

}
}
`


const CHANGE_DEAL = gql`
   mutation ChangeDeal($locationid: ID!, $dealid: ID!, $dealtitle: String!, $description: String!, $featured: Boolean){
      ChangeDeal(locationid: $locationid, dealid:$dealid, dealtitle:$dealtitle,description:$description,featured:$featured){
        dealid
        dealtitle

  }
}
`

function SayNo(){
  {console.log('NO')}
}






function EditDealPage(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_LOCATIONS)
    const[changedeal,{datam}]= useMutation(CHANGE_DEAL)
    let featured;

     featured=props.history.location.state.featured;

    function changeFeatured(){
      if(featured){
        console.log(featured);
        featured=false;
      }
      else{
        console.log(featured);
        featured=true;
      }
    }



  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log(data);

  return <EditDealPageComponent locations={data} history={history} title={props.history.location.state.title} description={props.history.location.state.description} featured={featured} dealid={props.history.location.state.dealid} locationid={props.history.location.state.locationid} changedeal={changedeal} changefeatured={changeFeatured}/>
}

class EditDealPageComponent extends React.Component {

  constructor(props) {
  super(props);
  this.state = {locations: this.props.locations, history:this.props.history, title:this.props.title, description:this.props.description, featured:this.props.featured, dealid:this.props.dealid, locationid:this.props.locationid, changedeal:this.props.changedeal, changefeatured:this.props.changefeatured};
}




  render(){
    return (
      <form noValidate autoComplete="off">
      <div>
       <Button onClick={(event)=>{this.props.history.goBack()}}>GoBack</Button>
      <TextField required ref="TitleField" label="Required" defaultValue={this.state.title} onChange={(event)=>{this.setState({title:event.target.value});}}/>
      <TextField required ref="DescriptionField" label="Required" defaultValue={this.state.description} onChange={(event)=>{this.setState({description:event.target.value});}}/>
      <Checkbox enabled checked={this.state.featured} color='primary' onChange={e=>{ this.setState({featured:e.target.checked});}}/>
      <TextField
       select
       label="Select"
       defaultValue={this.state.locationid}
       onChange={e=>{this.setState({locationid:e.target.value}); console.log(e.target.value);}}

     >
     {this.state.locations.locations.map((location) => (
           <MenuItem key={location.locationid} value={location.locationid}>
             {location.locationname}
           </MenuItem>
         ))}
       </TextField>

       <Button onClick={(event)=>{this.props.changedeal({variables:{locationid:this.state.locationid, dealid:this.state.dealid,dealtitle:this.state.title,description:this.state.description,featured:this.state.featured}}); this.state.history.goBack();}}>Submit</Button>


   </div>
   </form>

    );
  }
}

export default EditDealPage
