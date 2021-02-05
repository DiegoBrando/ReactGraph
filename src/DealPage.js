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





  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>

  return <DealsTableComponent deals={data} classes={classes} deletedeal={deletedeal} history={history}/>
}

class DealsTableComponent extends React.Component {

  constructor(props) {
  super(props);

  this.state = {deals: this.props.deals,class:this.props.classes,deletedeal:this.props.deletedeal, history:this.props.history};
}
handleRemove(id) {
  console.log(id)
 var newdeals = this.state.deals.alldealsbylocationid.filter((deal) => deal.dealid != id);
 console.log(newdeals)
   this.setState({deals:{'alldealsbylocationid':newdeals}})

}



  render(){
    return (
 <div><Grid container spacing={3}>
 <Grid item xs><Button onClick={(event)=>{this.props.history.goBack()}}>GoBack</Button></Grid>
  <Grid item xs><Button onClick={(event)=>{console.log(event); this.props.history.push({pathname:'/NewDeal',state:{locationid:this.state.deals.alldealsbylocationid[0].location[0].locationid}}); }}>New Deal</Button></Grid>
 </Grid>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Comment</TableCell>
              <TableCell align="right">dealtitle</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">featured</TableCell>
              <TableCell align="right">locationname</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell aligh="right">Delete</TableCell>
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
                  <TableCell align="right"><Button onClick={(event)=>{console.log(event); this.props.history.push({pathname:'/EditDeal',state:{locationid:deal.location[0].locationid,title:deal.dealtitle,description:deal.description,featured:deal.featured,dealid:deal.dealid}}); }}>Edit</Button></TableCell>
                    <TableCell align="right"><Button onClick={(event)=>{this.props.deletedeal({variables:{dealid:deal.dealid, dealtitle:deal.dealtitle}}); this.handleRemove(deal.dealid); }}>Delete Deal</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

    );
  }
}

export default DealsTable
