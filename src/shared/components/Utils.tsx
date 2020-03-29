import React from 'react';

export function getActorProfileLink(id: number, name: string) {
  return <a href={"https://www.themoviedb.org/person/"+id} target="_blank">{name}</a>
}

export function getShowLink(id: number, name: string, showType: string) {
  return <a href={"https://www.themoviedb.org/"+showType+"/"+id} target="_blank">{name}</a>
}
