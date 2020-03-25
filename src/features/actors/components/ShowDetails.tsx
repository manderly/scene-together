import React from 'react';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, makeStyles } from '@material-ui/core';
import ShowTypeIcon from './ShowTypeIcon';
import { blue } from '@material-ui/core/colors';

// define the params here 
interface IShowDetails {
  showName: string;
  showDate: number;
  showType: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 385,
    maxWidth: 385,
  },
  pullLeft: {
    float: "left",
  },
  avatar: {
    backgroundColor: blue[300],
  }
});

/* Needs a root node, so <>  </> serves that purpose here */
const ShowDetails: React.FC<IShowDetails> = ({ showName, showDate, showType }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardHeader 
          avatar={
            <Avatar className={classes.avatar}>
              <ShowTypeIcon showType={showType}/>
            </Avatar>
          }
          title={showName}
          subheader={<Moment format="MMMM D, YYYY">{showDate}</Moment>}
        />

      </CardContent>
    </Card>
  )
}

export default ShowDetails;