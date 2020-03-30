import React from 'react';

interface IShowDetailsLink {
  id: number;
  name: string;
  showType: string;
}

const ShowDetailsLink: React.FC<IShowDetailsLink> = ({ id, name, showType }) => {
  return (
    <a href={"https://www.themoviedb.org/"+showType+"/"+id} target="_blank" rel="noopener noreferrer">{name}</a>
  );
}

export default ShowDetailsLink;

