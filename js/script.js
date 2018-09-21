/**
 * Entry point of the code
 */
async function start(){
    //Start the search process;
    let results = await getSearchData();
    //Now set the html of the body to the JSON that was fetched
    document.getElementsByTagName("pre")[0].innerHTML = JSON.stringify(results);
}


/**
 * Retrieves the access token from the api, and returns that token
 */
async function getAccessToken() {
    let response = await fetch('https://manc.hu/api/oauth/token', {
        method: 'post',
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "client_id=6nqtHYGpTc&client_secret=uv179ZWxI5rfIw6ilYGfA87TeAAAls5I&grant=client_credentials&scope=lexicon"
    })
    //Store the key after request
    let key = await response.json();
    //Now do the request with the access token
    return key.access_token;
}

/**
 * Starts the search process, first asks for an access token,
 * then checks if the keyword value is not empty or otherwise invalid
 */
async function getSearchData() {
    //First check if the keyword is valid
    var keyword = getKeyword();
    //Abort if keyword is undefined or not of a proper length
    if(!keyword || keyword.length < 1) return;
    //Now set up the request method
    let response = await fetch('https://manc.hu/api/lexicon/search', {
        method: 'post',
        mode: "cors",
        headers: {
            "Authorization": "Bearer " + (await getAccessToken()),
            "Content-Type": "application/json",
        },
        body: '{"query": "' + keyword + '","definition": true,"from": 0,"size": 100}'
    })
    //Now wait for the response
    let result = await response.json();
    return result;
}


/**
 * Returns the keyword that is appended
 * as GET variable from the url
 */
function getKeyword() {
    //First grab the url
    let url = window.location.href;
    //Check if we have a GET value in there, if not return empty
    if (url.indexOf("?") < 0) return "";
    //Now only read the get part
    let get = url.split('?')[1];
    //Split the get part into pairs, each is a key value pair
    let pairs = get.split("&");
    //Iterate over the pairs, and only once you see keyword we return the value
    var returnValue = "";
    pairs.forEach(function (pair) {
        if (pair.split("=")[0].toLowerCase() == "keyword") {
            returnValue = pair.split("=")[1];
        }
    });
    //Now return the value whether it contains a string or not
    return returnValue;
}