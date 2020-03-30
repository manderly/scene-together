import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { pink } from '@material-ui/core/colors';

import ActorProfileLink from 'shared/components/Results/ResultsList/DetailsCards/ActorProfileLink';
import ShowDetailsLink from 'shared/components/Results/ResultsList/DetailsCards/ShowDetailsLink';

import './DetailsCard.css';

// define the params here 
interface IActorDetails {
  id: number;
  name: string;
  showName1: string;
  showName2: string;
  showID1: number;
  showID2: number;
  showType1: string;
  showType2: string;
  characterName1: string;
  characterName2: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 520,
    maxWidth: 520,
  },
  pullLeft: {
    float: "left",
  },
  avatar: {
    backgroundColor: pink[300],
  }
});

/* Needs a root node, so <>  </> serves that purpose here */
const ActorDetails: React.FC<IActorDetails> = ({ id, name, showName1, showName2, showID1, showID2, showType1, showType2, characterName1, characterName2 }) => {
  const classes = useStyles();

  const cardTitle = <ActorProfileLink id={id} name={name}/>;


  return (
    <Card className={classes.root}>
      <CardContent className="detailsCard">
        <CardHeader className="detailsCardHeader"
          avatar={
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          }
          title={cardTitle}
          subheader={"Actor"} // could be expanded to roles beyond acting 
        />
        <br/>
        <Typography><b>{<ShowDetailsLink id={showID1} name={showName1} showType={showType1}/>}</b>{characterName1 !== '' ? ` as ${characterName1}` : ''}</Typography>
        <Typography><b>{<ShowDetailsLink id={showID2} name={showName2} showType={showType2}/>}</b>{characterName2 !== '' ? ` as ${characterName2}` : ''}</Typography>
      </CardContent>
    </Card>
  )
}

export default ActorDetails;