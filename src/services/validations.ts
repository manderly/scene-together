import moment from 'moment';

export function isWithinCutoff(yearCutoff: string, date) {
  let isWithinCutoffRange = false;
  if (yearCutoff === '') {
    isWithinCutoffRange = true;
  } else {
    let nowMinusCutoff = moment().subtract(yearCutoff, 'years').format('YYYY-MM-DD');
    if (date < nowMinusCutoff) {
      isWithinCutoffRange = false;
    } else if (date >= nowMinusCutoff) {
      isWithinCutoffRange = true;
    } else {
      console.log("Bad date state, check isWithinCutoff");
    }
  }

  return isWithinCutoffRange;
}

export function isMatch(val: any, res: any, paramStr: string) {
  let isMatch = false;
  if (res[paramStr] === val[paramStr]) {
    isMatch = true;
  }
  return isMatch;
}

export function isValidTVCredit(yearCutoff: string, credit: any) {
  let isValid = false;

  if (credit['media_type'] === 'tv' && 
      credit['name'] !== undefined && 
      credit['character'] !== '' &&
      isWithinCutoff(yearCutoff, credit['first_air_date'])) {
    isValid = true;
  }
  return isValid;
}

export function isValidMovieCredit(yearCutoff: string, credit: any) {
  let isValid = false;
  if (credit['media_type'] === 'movie' && isWithinCutoff(yearCutoff, credit['release_date'])) {
    isValid = true;
  }
  return isValid;
}