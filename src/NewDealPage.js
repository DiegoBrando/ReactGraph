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


const ADD_DEAL = gql`
   mutation SubmitDeal($locationid: ID!,  $dealtitle: String!, $description: String!){
      SubmitDeal(locationid: $locationid,dealtitle:$dealtitle,description:$description){
        dealid
        dealtitle

  }
}
`

function SayNo(){
  {console.log('NO')}
}






function NewDealPage(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_LOCATIONS)
    const[adddeal,{datam}]= useMutation(ADD_DEAL)



  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log(data);

  return <NewDealPageComponent locations={data} history={history} title="" description=""  locationid={props.history.location.state.locationid} adddeal={adddeal} classes={classes}/>
}

class NewDealPageComponent extends React.Component {
  constructor(props) {
  super(props);
  this.state = {classes:this.props.classes, locations: this.props.locations, history:this.props.history, title:this.props.title, description:this.props.description, featured:this.props.featured, dealid:this.props.dealid, locationid:this.props.locationid, changedeal:this.props.changedeal, changefeatured:this.props.changefeatured, deletedeal:this.props.deletedeal, open:false, width:100};
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

<SideBar locationid={this.state.locationid}/>
           </Drawer>


           <div style={{marginLeft:this.state.width}} >

           <Container maxWidth="lg" >
      <form noValidate autoComplete="off">



      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
        <TextField required ref="TitleField" label="Title" defaultValue={this.state.title} onChange={(event)=>{this.setState({title:event.target.value});}}/>
      </Paper>
      </Grid>

      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
      <TextField required ref="DescriptionField" label="Description" defaultValue={this.state.description} onChange={(event)=>{this.setState({description:event.target.value});}}/>
      </Paper>
      </Grid>

      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>featured</Typography>
      <Checkbox enabled checked={this.state.featured} color='primary' onChange={e=>{ this.setState({featured:e.target.checked});}}/>
      </Paper>
      </Grid>
      <Grid item xs={12} md={9} lg={9}>
      <Paper className={this.state.classes.paper}>
      <TextField
       select
       label="Select Location"
       defaultValue={this.state.locationid}
       onChange={e=>{this.setState({locationid:e.target.value}); console.log(e.target.value);}}

     >

     {this.state.locations.locations.map((location) => (
           <MenuItem key={location.locationid} value={location.locationid}>
             {location.locationname}
           </MenuItem>
         ))}
       </TextField>
       </Paper>
       </Grid>
       <Grid item xs={12} md={9} lg={9}>
       <Paper className={this.state.classes.paper}>
       <Button onClick={(event)=>{this.props.adddeal({variables:{locationid:this.state.locationid, dealtitle:this.state.title,description:this.state.description}}); this.state.history.goBack()}}>Submit</Button>
</Paper>
</Grid>
   </form>
   </Container>
   </div>

   </React.Fragment>

    );
  }
}

export default NewDealPage
