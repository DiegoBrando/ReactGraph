import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client';
import clsx from 'clsx';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SideBar from './Widgets/SideBar.js'
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from 'react-router-dom';
import LocationInfo from './Widgets/LocationInfo.js'
import ViewsChart from './Widgets/ViewsChart.js'
import ClicksChart from './Widgets/ClicksChart.js'
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import useStyles from './styling.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



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

  this.state = {locationinfo: this.props.locationinfo,classes:this.props.classes, history:this.props.history, width:100,open:false};
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


        <SideBar locationid={this.state.locationinfo.locationbyid[0].locationid}/>
      </Drawer>




<div style={{marginLeft:this.state.width}} >

<Container maxWidth="lg" >
<Grid container spacing={3} className={this.state.classes.container}>
<Grid item xs={12} md={9} lg={9}>
<Paper className={this.state.classes.paper}>
<LocationInfo locationid={this.state.locationinfo.locationbyid[0].locationid}/>
</Paper>
</Grid>

<Grid item xs={12} md={9} lg={9}>
<Paper className={this.state.classes.paper}>
<ViewsChart locationid={this.state.locationinfo.locationbyid[0].locationid}/>
</Paper>
</Grid>

<Grid item xs={12} md={9} lg={9}>
<Paper>
<ClicksChart locationid={this.state.locationinfo.locationbyid[0].locationid}/>
</Paper>
</Grid>

</Grid>
</Container>

</div>
</React.Fragment>

    );
  }
}

export default LandingPage
