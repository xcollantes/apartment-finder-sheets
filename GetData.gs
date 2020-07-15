/**
* Appscript to get data for apartment finder.
* 
* author: Xavier Collantes (collantes.xavier@gmail.com)
*/

walkResponse = "";
WALK_API_KEY = " ";
GOOGLE_MAPS_KEY = "";

function _getWalkscoreResponseHandler(address){
  var latLongArr = encodeCoordinates(address);
  
  var url = encodeURI("http://api.walkscore.com/score" +
                      "?format=json&${address}" +
                      "&lat=${}" +
                      "&lon=${}" +
                      "&transit=1" +
                      "&bike=1" +                      
                      "&wsapikey=${WALK_API_KEY}")
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);

  return jsonResponse;
}


function _geoencode(address){
  var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json" +
                      "?address=${address}" +
                      "&key=${GOOGLE_MAPS_KEY}")
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);
  
  Logger.log(url);
  
  Logger.log("GOOGLE: " + jsonResponse.results.geometry);

  return 
}


function getWalkscore(address){
  jsonResponse = _getWalkscoreResponseHandler(address);
  Logger.log(jsonResponse);
  return jsonResponse["walkscore"];
}


function getBikescore(address){
  jsonResponse = _getWalkscoreResponseHandler(address);

  Logger.log(jsonResponse);

}

function test(){
  _geoencode("***REDACTED***")
  //Logger.log(getWalkscore("***REDACTED***"));

}
