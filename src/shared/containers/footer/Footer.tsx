import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {AppBar, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={"appFooterBar"}>
        <Typography variant="body1" className={classes.title}>
          © 2020 MJ Burley <a href="">Project GitHub</a>
        </Typography>

        <Typography variant="body2">
          API credit: <a href="https://www.themoviedb.org/">The Movie Database</a>
        </Typography>

        <Typography variant="body2">
        This product uses the TMDb API but is not endorsed or certified by TMDb. 
        </Typography>
    </AppBar>
  );
} 

export default Footer;