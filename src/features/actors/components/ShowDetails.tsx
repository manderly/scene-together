import React from 'react';
import Moment from 'react-moment';
import { Typography, Card, CardContent, makeStyles } from '@material-ui/core';
import ShowTypeIcon from './ShowTypeIcon';

// define the params here 
interface IShowDetails {
  showName: string;
  showDate: number;
  showType: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 345,
  },
  pullRight: {
    float: "right",
  },
});

/* Needs a root node, so <>  </> serves that purpose here */
const ShowDetails: React.FC<IShowDetails> = ({ showName, showDate, showType }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>

          <span>{showName}</span>
          <span className={classes.pullRight}><ShowTypeIcon showType={showType}/></span>
        
        <Typography variant="body2" color="textSecondary" component="p">
          <Moment format="MMMM D, YYYY">{showDate}</Moment>
        </Typography>

      </CardContent>
    </Card>
  )
}

export default ShowDetails;