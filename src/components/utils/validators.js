export function urlValidator(url) {
    const urlRegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

    if(urlRegExp.test(url)){
        return true;
    } else {
        return false;
    }
}

export function checkMovieTrailerUrl(url) {
    if(urlValidator(url)) {
      return url;
    } else {
      return 'https://www.youtube.com';
    }  
  } 