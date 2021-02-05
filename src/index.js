import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import CommentsTable from './CommentsTable';
import LandingPage from './LandingPage';
import SelectPage from './BasicPage.js'
import DealsTable from './DealPage.js'
import EditDealPage from './EditDealPage'
import NewDealPage from './NewDealPage'
import EditLocationPage from './EditLocation.js'
import AddLocationPage from './AddLocation.js'
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const client = new ApolloClient({
  uri: ' https://y78f3ynr83.execute-api.us-east-1.amazonaws.com/dev/graphql'
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Router>



    <Route exact path='/' component={SelectPage}/>



    <Route exact path='/Comments' component={CommentsTable}/>
    <Route exact path='/Landing' component={LandingPage}/>
    <Route exact path='/Deals' component={DealsTable}/>
    <Route exact path='/EditDeal' component={EditDealPage}/>
    <Route exact path='/NewDeal' component={NewDealPage}/>
    <Route exact path='/EditLocation' component={EditLocationPage}/>
    <Route exact path='/NewLocation' component={AddLocationPage}/>






      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
