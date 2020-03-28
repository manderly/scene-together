import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { pink } from '@material-ui/core/colors';

// define the params here 
interface IActorDetails {
  name: string;
  showName1: string;
  showName2: string;
  characterName1: string;
  characterName2: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 585,
    maxWidth: 585,
  },
  pullLeft: {
    float: "left",
  },
  avatar: {
    backgroundColor: pink[300],
  }
});

/* Needs a root node, so <>  </> serves that purpose here */
const ActorDetails: React.FC<IActorDetails> = ({ name, showName1, showName2, characterName1, characterName2 }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardHeader 
          avatar={
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          }
          title={name}
          subheader='Something useful here'
        />
        <br/>
        <Typography><b>{showName1}</b> as {characterName1}</Typography>
        <Typography><b>{showName2}</b> as {characterName2}</Typography>
      </CardContent>
    </Card>
  )
}

export default ActorDetails;