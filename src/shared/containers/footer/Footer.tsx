import React from 'react';

import {AppBar, Typography, Box} from '@material-ui/core';

import './Footer.css';

const Footer: React.FC = () => {

  return (
    <AppBar position="static" className={"appFooterBar"}>
      <Box p={2}>
          <Typography variant="body1">
            © 2020 M.J.B. | <a href="https://github.com/MJGrant/scene-together">Project GitHub</a>
          </Typography>

          <Typography variant="caption">
            API credit: <a href="https://www.themoviedb.org/">The Movie Database</a>
          </Typography>
          <br/>
          <Typography variant="caption">
          This product uses the TMDb API but is not endorsed or certified by TMDb.
          </Typography>
        </Box>
    </AppBar>
  );
} 

export default Footer;