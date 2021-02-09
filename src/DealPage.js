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
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styling.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";







const DELETE_DEAL = gql`
   mutation DeleteDeal($dealid: ID!, $dealtitle: String!){
      DeleteDeal(dealid:$dealid, dealtitle:$dealtitle){
dealid
dealtitle

  }
}
`

const GET_DEALS = gql`
query alldealsbylocationid($id:ID!){
  alldealsbylocationid(id:$id){
    dealid
      dealtitle
      description
      featured
      location{
        locationid
        locationname

      }
      views
      clicks
	}
}
`

function SayNo(){
  {console.log('NO')}
}






function DealsTable(props){


  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_DEALS,{variables:{'id':props.history.location.state.locationid}})
  const[deletedeal,{datam}]= useMutation(DELETE_DEAL)
  var totalclicks=0;
  var totalviews=0;





  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  if (data){
    for (var d in data.alldealsbylocationid){

     totalviews=totalviews+parseInt(data.alldealsbylocationid[d].views)
     totalclicks=totalclicks+parseInt(data.alldealsbylocationid[d].clicks)

   }
  }



  return<DealsTableComponent deals={data} classes={classes} deletedeal={deletedeal} history={history} totalviews={totalviews} totalclicks={totalclicks} locationid={props.history.location.state.locationid}/>
}

class DealsTableComponent extends React.Component {

  constructor(props) {
  super(props);

  this.state = {deals: this.props.deals,classes:this.props.classes,deletedeal:this.props.deletedeal, history:this.props.history, open:false, width:100, totalclicks:this.props.totalclicks, totalviews:this.props.totalviews, locationid:this.props.locationid};
}
handleRemove(id) {
  console.log(id)
 var newdeals = this.state.deals.alldealsbylocationid.filter((deal) => deal.dealid != id);
 console.log(newdeals)
   this.setState({deals:{'alldealsbylocationid':newdeals}})

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

<div style={{marginLeft:this.state.width}}>
<Paper>
<Grid container spacing={3}>

  <Grid item xs={12}><Button onClick={(event)=>{console.log(event); this.props.history.push({pathname:'/NewDeal',state:{locationid:this.state.locationid}}); }}>New Deal</Button></Grid>
 <Grid item xs={12}><Typography component="h2" variant="h6" color="primary" gutterBottom>Total Views: {this.state.totalviews}  Total Clicks: {this.state.totalclicks}</Typography></Grid>
 </Grid>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table" className={ {minWidth: 650, maxWidth:900}}>
          <TableHead>
            <TableRow>
              <TableCell>dealid</TableCell>
              <TableCell align="right">dealtitle</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">featured</TableCell>
              <TableCell align="right">locationname</TableCell>
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Clicks</TableCell>
              <TableCell align="right">Edit</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.deals.alldealsbylocationid.map((deal) => (





              <TableRow key={deal.dealid}>
                <TableCell component="th" scope="row">
                  {deal.dealid}
                </TableCell>
                <TableCell align="right">{deal.dealtitle}</TableCell>
                <TableCell align="right">{deal.description}</TableCell>
                <TableCell align="right"> <Checkbox disabled checked={deal.featured} color='primary'/></TableCell>
                <TableCell align="right">{deal.location[0].locationname}</TableCell>
                <TableCell align="right">{deal.views}</TableCell>
                <TableCell align="right">{deal.clicks}</TableCell>
                  <TableCell align="right"><Button onClick={(event)=>{console.log(event); this.props.history.push({pathname:'/EditDeal',state:{locationid:this.state.locationid,title:deal.dealtitle,description:deal.description,featured:deal.featured,dealid:deal.dealid}}); }}>Edit</Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      </div>
      </React.Fragment>

    );
  }
}

export default DealsTable
