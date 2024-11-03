import React from 'react'
import {AppBar,Divider, Toolbar, Typography, Avatar, Box} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ListAatar from '../components/Navbar/ListAvatar'




const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: { xs: 'none', md: 'flex' }, mr: 1
  },
  
  navlinks: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
 
 logo: {
  maxWidth: 100,
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    backgroundColor:'#385399',
    marginLeft: theme.spacing(2),
    "&:hover": {
      color: "#FB0909",
      borderBottom: "1px solid white",
    },},
  toolbarmenu:{
    display: "flex",
    justifyItems: "start",
    gap: "10px",
  },
  buttonPadding: {    
    padding: '30px',   
  },
  logoLg: {
    display: "none",
    color: "#FF3358",
    flexGrow: 1 ,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  
  
  
  icon: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex")
  },
  badge: {
    marginLeft: theme.spacing(2)
  }
}));

function Navabr() {
 
  const classes = useStyles();
  return (
    <AppBar  sx={{  position: 'static',color:"inherit" }}>
      <div>
      <Toolbar sx={{display: { xs: 'none', md: 'flex' }, mr: 1}}>
        <Typography variant="h6" className={classes.logoLg}>
        
        <img src="https://benobe.ir/theme/np_site/portal/assets/images/benobe/benobe.svg"
         alt="logo" className={classes.logo} />
        </Typography>
        <Box sx={{display: { xs: 'none', md: 'flex' },alignItems:"center", mr: 1}}>
        <Typography variant="h5" sx={{margin:3}} > دکتر {"رسول زاده"}  </Typography>
        
     
        <ListAatar/>
        </Box>
        
        
      </Toolbar>
      </div>
      <Divider light />

     
    </AppBar>
  );
}

export default Navabr;
