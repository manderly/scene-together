import React from 'react';
import { Grid, Box, Button } from '@material-ui/core';

// define the params here 
interface ISubmitFormButton {
  buttonText: string;
}

const SubmitFormButton: React.FC<ISubmitFormButton> = ({ buttonText }) => {
  return (
  <Grid item>
    <Box textAlign="center" p={4}>
      <Button variant="contained" color="primary" size="large" type="submit">{buttonText}</Button>
    </Box>
  </Grid>
  );
}

export default SubmitFormButton;