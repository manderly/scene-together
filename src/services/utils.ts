/* Utility functions shared by both Actors and Shows pages */

export const buildInCommonText = (includeMovies: boolean, includeTV: boolean) => {
  let showTypesStr = '';
  if (includeMovies && includeTV) {
    showTypesStr = 'Movies and TV shows';
  } else if (includeMovies && !includeTV) {
    showTypesStr = "Movies";
  } else if (!includeMovies && includeTV) {
    showTypesStr = "TV shows";
  } else {
    showTypesStr = "Nothing";
  }

  showTypesStr += " in common";

  return showTypesStr;
}