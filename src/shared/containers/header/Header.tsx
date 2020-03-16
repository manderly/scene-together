import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import Link from '@material-ui/core/Link';

import MenuIcon from '@material-ui/icons/Menu';

import './Header.css';

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

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Actors in Common
        </Typography>

        <Link href="/search-by-actors" color="secondary">
          Search by actors
        </Link>

        <Link href="/search-by-shows" color="secondary">
          Search by shows
        </Link>

      </Toolbar>
    </AppBar>
  );
} 

export default Header;