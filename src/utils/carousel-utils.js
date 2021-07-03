export const setInitialIndex = function(length) {
    return Math.ceil(length/2);
}

export const checkScreen = function(mediaQueryList) {
    return mediaQueryList.matches ? 'mobile' : 'desktop'
}