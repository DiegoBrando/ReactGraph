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

const GET_COMMENTS = gql`
query commentsbylocationid($locationid:ID!){
  commentsbylocationid(locationid:$locationid){
  commentid
    userid
    title
    description
	}
}
`

function SayNo(){
  {console.log('NO')}
}






function CommentsTable(props){
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_COMMENTS,{variables:{'locationid':props.history.location.state.locationid}})
  const[addToDo,{datam}]= useMutation(DELETE_COMMENT)

  if (error) return <h1>{error.message}</h1>
  if (loading) return <h1>Loading...</h1>

  return <CommentsTableComponent comments={data} classes={classes} addToDo={addToDo} history={history}/>
}

class CommentsTableComponent extends React.Component {

  constructor(props) {
  super(props);

  this.state = {comments: this.props.comments,class:this.props.classes,addToDo:this.props.addToDo, history:this.props.history};
}

 handleRemove(id) {
  var newcomments = this.state.comments.commentsbylocationid.filter((comment) => comment.commentid != id);
    this.setState({comments:{'commentsbylocationid':newcomments}})

}


  render(){
    return (
 <div><Grid container spacing={3}>
 <Grid item xs><Button onClick={(event)=>{this.props.history.goBack()}}>GoBack</Button></Grid>
 </Grid>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Comment</TableCell>
              <TableCell align="right">commentid</TableCell>
              <TableCell align="right">userid</TableCell>
              <TableCell align="right">title</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.comments.commentsbylocationid.map((comment) => (


              <TableRow key={comment.commentid}>
                <TableCell component="th" scope="row">
                  {comment.commentid}
                </TableCell>
                <TableCell align="right">{comment.commentid}</TableCell>
                <TableCell align="right">{comment.userid}</TableCell>
                <TableCell align="right">{comment.title}</TableCell>
                <TableCell align="right">{comment.description}</TableCell>
                <TableCell align="right"><Button onClick={(event)=>{this.props.addToDo({variables:{commentid:comment.commentid}}); this.handleRemove(comment.commentid); }}>DeleteComment</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

    );
  }
}

export default CommentsTable
