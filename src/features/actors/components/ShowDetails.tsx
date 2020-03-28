import React from 'react';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import ShowTypeIcon from './ShowTypeIcon';
import { blue, green } from '@material-ui/core/colors';

// define the params here 
interface IShowDetails {
  id: number;
  showName: string;
  showDate: number;
  showType: string;
  actorName1: string;
  actorName2: string;
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
  movieAvatar: {
    backgroundColor: blue[300],
  },
  tvAvatar: {
    backgroundColor: green[200],
  }
});

function getShowDetailsLink(id: number, showType: string, showName: string) {
  return <a href={"https://www.themoviedb.org/"+showType+"/"+id}>{showName}</a>
}

/* Needs a root node, so <>  </> serves that purpose here */
const ShowDetails: React.FC<IShowDetails> = ({ id, showName, showDate, showType, actorName1, actorName2, characterName1, characterName2 }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className="resultsCard">
        <CardHeader className="resultsCardHeader"
          avatar={
            <Avatar className={showType === "movie" ? classes.movieAvatar : classes.tvAvatar}>
              <ShowTypeIcon showType={showType}/>
            </Avatar>
          }
          title={getShowDetailsLink(id, showType, showName)}
          subheader={<span>{showType === "movie" ? "Release date:" : "First aired:"} <Moment format="MMMM D, YYYY">{showDate}</Moment></span>}
        />
        <br/>
        <Typography><b>{actorName1}</b> as {characterName1}</Typography>
        <Typography><b>{actorName2}</b> as {characterName2}</Typography>
      </CardContent>
    </Card>
  )
}

export default ShowDetails;