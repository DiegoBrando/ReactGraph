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


const DELETE_COMMENT = gql`
   mutation deletereviewbycommentid($commentid: ID!){
      deletereviewbycommentid(commentid: $commentid){
      commentid
      userid
      title
      description

  }
}
`

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

function SayNo(){
  {console.log('NO')}
}






function LandingPage(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_LOCATION,{variables:{'id':props.history.location.state.locationid}})


  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>

  return <LandingPageComponent locationinfo={data} classes={classes} history={history}/>
}



class LandingPageComponent extends React.Component {

  constructor(props) {
  super(props);

  this.state = {locationinfo: this.props.locationinfo,class:this.props.classes, history:this.props.history};
}




  render(){
    return (
 <div><Grid container spacing={3}>
 <Grid item xs><Button onClick={(event)=>{this.state.history.goBack()}}>GoBack</Button></Grid>
 </Grid>
 <Grid container spacing={3}>

 <Grid item xs={12}> <Button onClick={(event)=>{console.log(this.state.locationinfo.locationbyid[0].locationid); this.state.history.push({pathname:'/Deals',state:{locationid:this.state.locationinfo.locationbyid[0].locationid}}); }}>Deals</Button></Grid>
 <Grid item xs={12}> <Button onClick={(event)=>{console.log(this.state.locationinfo.locationbyid[0].locationid); this.state.history.push({pathname:'/Comments',state:{locationid:this.state.locationinfo.locationbyid[0].locationid}}); }}>Comments</Button></Grid>
  <Grid item xs={12}> <Button onClick={(event)=>{console.log(this.state.locationinfo.locationbyid[0].locationid); this.state.history.push({pathname:'/EditLocation',state:{locationid:this.state.locationinfo.locationbyid[0].locationid,locationname:this.state.locationinfo.locationbyid[0].locationname, latitude:this.state.locationinfo.locationbyid[0].latitude,longitude:this.state.locationinfo.locationbyid[0].longitude}}); }}>Change Location</Button></Grid>



 </Grid>
<Grid container spacing={1}>


<Grid item lg={10}></Grid>
<Grid item lg={10}></Grid>
<Grid item lg={10}>{this.state.locationinfo.locationbyid[0].locationname}</Grid>
<Grid item lg={10}>{this.state.locationinfo.locationbyid[0].latitude }       {this.state.locationinfo.locationbyid[0].longitude}</Grid></Grid>


      </div>

    );
  }
}

export default LandingPage
