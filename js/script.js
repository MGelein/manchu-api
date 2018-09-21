/**
 * Returns the keyword that is appended
 * as GET variable from the url
 */
function getKeyword(){
    //First grab the url
    let url = window.location.href;
    //Check if we have a GET value in there, if not return empty
    if(url.indexOf("?") < 0) return "";
    //Now only read the get part
    let get = url.split('?')[1];
    //Split the get part into pairs, each is a key value pair
    let pairs = get.split("&");
    //Iterate over the pairs, and only once you see keyword we return the value
    var returnValue = "";
    pairs.forEach(function(pair){
        if(pair.split("=")[0].toLowerCase() == "keyword"){
            returnValue = pair.split("=")[1];   
        }
    });
    //Now return the value whether it contains a string or not
    return returnValue;
}