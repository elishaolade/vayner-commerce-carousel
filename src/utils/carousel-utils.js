export const checkScreen = function(mediaQueryList) {
    return mediaQueryList.matches ? 'mobile' : 'desktop'
}