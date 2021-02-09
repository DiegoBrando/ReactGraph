import React, { useState }  from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {useHistory} from 'react-router-dom';


function SideBar(props){
  const history = useHistory();



  return <SideBarComponent locationid={props.locationid} history={history}/>

}

class SideBarComponent extends React.Component {

    constructor(props) {
    super(props);
    this.state = {locationid: this.props.locationid, history:this.props.history};
  }



  render(){
    return (
      <React.Fragment>
      <List>

      <ListItem button onClick={(event)=>{console.log(this.state.locationid); this.props.history.push({pathname:'/Landing',state:{locationid:this.state.locationid}}); }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>



      <ListItem button onClick={(event)=>{ console.log(this.state.locationid); this.state.history.push({pathname:'/Deals',state:{locationid:this.state.locationid}}); }}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Deal" />
      </ListItem>


      <ListItem button onClick={(event)=>{ console.log(this.state.locationid); this.state.history.push({pathname:'/Comments',state:{locationid:this.state.locationid}}); }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>


      <ListItem button onClick={(event)=>{this.state.history.goBack(); }}>
        <ListItemIcon>
          <KeyboardReturnIcon />
        </ListItemIcon>
        <ListItemText primary="GoBack" />
      </ListItem>

</List>
      </React.Fragment>


    )}





}


export default SideBar
