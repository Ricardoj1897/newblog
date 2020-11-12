import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>({
  appBar: {
    backgroundColor: "cornflowerblue"
  },
})
)


const Header = () => {
  const classes = useStyles();

  return(
    <AppBar className={classes.appBar} position="static">
    <Toolbar>
      <Typography variant="h6" color="primary">
        Making Your Life Easier
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Header;