import React, { PureComponent } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from '@apollo/client';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../App.css'
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
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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







const GET_DEALS = gql`
query alldealsbylocationid($id:ID!){
  alldealsbylocationid(id:$id){
    dealid
      dealtitle
      views
      clicks
	}
}
`

function SayNo(){
  {console.log('NO')}
}



function createData(dealid,dealtitle, views, clicks) {
  return { dealid,dealtitle, views, clicks };
}



function ClicksandViewsChart(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_DEALS,{variables:{'id':props.locationid}})






  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>


  return <ClicksandViewsChartComponent xaxis={props.xaxis} yaxis={props.yaxis} color={props.color} deals={data.alldealsbylocationid.map((deal) => (
createData(parseInt(deal.dealid),deal.dealtitle,parseInt(deal.views),parseInt(deal.clicks))
 ))} history={history}/>
}

class ClicksandViewsChartComponent extends React.Component {

  constructor(props) {
  super(props);



  this.state = {deals: this.props.deals, history:this.props.history, yaxis:this.props.yaxis, xaxis:this.props.xaxis, color:this.props.color};
  console.log(this.state.deals);
}




  render(){
    console.log('COLOR');
    console.log(this.state.color)
    console.log(this.state.deals);
    return (

          <React.Fragment>

          <Typography component="h2" variant="h6" color="primary" gutterBottom>
               {this.state.yaxis}
             </Typography>

      <BarChart height={500} width={500}  margin={{top:5, right:30,left:20,bottom:5}} data={this.state.deals}>
      <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={this.state.xaxis}  type="category"/>
    <YAxis type="number"/>


    <Bar dataKey={this.state.yaxis} fill={this.state.color} />

  </BarChart>

          </React.Fragment>
      );
  }
}

export default ClicksandViewsChart
