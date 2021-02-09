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
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import {useHistory} from 'react-router-dom';
import clsx from 'clsx';


function SideBar(props){
  const history = useHistory();



  return <SideBarComponent locationid={props.locationid} history={history} classes={props.classes} open={props.open} handletoggle={props.handletoggle} statesetting={props.statesetting} changeopen={props.changeopen}/>

}

class SideBarComponent extends React.Component {

    constructor(props) {
    super(props);
    this.state = {locationid: this.props.locationid, history:this.props.history, classes:this.props.classes , open:this.props.open, handletoggle:this.props.handletoggle, statesetting:this.props.statesetting , changeopen:this.props.changeopen};
  }
handleTogglelocal = () => this.setState({open: !this.state.open});


  render(){
    return (
      <React.Fragment>
      <Drawer
        variant="permanent"
        docked={false}

        open={this.state.open}
        onRequestChange={(open) => {this.setState({open}); this.state.changeopen(open);}}
        classes={{
          paper: clsx(this.state.classes.drawerPaper, !this.state.open && this.state.classes.drawerPaperClose),

        }}
        >
        <div className={this.state.classes.toolbarIcon}>
        <Button
          onClick={(event)=>{this.handleTogglelocal(); this.state.handletoggle(); this.state.statesetting();}}
        >
        <MenuIcon/>
        </Button>
        </div>
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
</Drawer>
      </React.Fragment>


    )}





}


export default SideBar
