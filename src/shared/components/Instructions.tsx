import React from 'react';
import { Box, Typography } from '@material-ui/core';

// define the params here 
interface IInstructions {
  title: string;
  subtitle: string;
}

const Instructions: React.FC<IInstructions> = ({ title, subtitle }) => {
  return (
    <Box textAlign="center" p={2} pt={4}>
      <Typography variant="h4" color="textPrimary">{title}</Typography>
      <Typography color="primary">{subtitle}</Typography>
    </Box>
  );
}

export default Instructions;