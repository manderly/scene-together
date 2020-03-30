import React from 'react';

interface IActorProfileLink {
  id: number;
  name: string;
}

const ActorProfileLink: React.FC<IActorProfileLink> = ({ id, name }) => {
  return (
    <a href={"https://www.themoviedb.org/person/"+id} target="_blank" rel="noopener noreferrer">{name}</a>
  );
}

export default ActorProfileLink;
