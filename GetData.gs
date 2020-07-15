/**
* Appscript to get data for apartment finder.
* 
* author: Xavier Collantes (collantes.xavier@gmail.com)
*/

walkResponse = "";
WALK_API_KEY = "";
GOOGLE_MAPS_KEY = "";

function _getWalkscoreResponseHandler(address){
  var latLongArr = _geoencode(address);
  
  var url = encodeURI("http://api.walkscore.com/score" +
                      "?format=json&" + `${address}` +
                      "&lat=" + `${latLongArr["lat"]}` +
                      "&lon=" + `${latLongArr["lng"]}` +
                      "&transit=1" +
                      "&bike=1" +                      
                      "&wsapikey=" + `${WALK_API_KEY}`)
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);

  return jsonResponse;
}


function _geoencode(address){
  var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json" +
                      "?address=" + `${address}` +
                      "&key=" + `${GOOGLE_MAPS_KEY}`)
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);

  return {"lat": jsonResponse.results[0].geometry.location.lat,
          "lng": jsonResponse.results[0].geometry.location.lng};
}


function getWalkscore(address){
  jsonResponse = _getWalkscoreResponseHandler(address);
  Logger.log(jsonResponse);
  return jsonResponse["walkscore"];
}


function getBikescore(address){
  jsonResponse = _getWalkscoreResponseHandler(address);
  Logger.log(jsonResponse);
  return jsonResponse["bike"].score;
}

function test(){
  //Logger.log(_geoencode("***REDACTED***"));
  Logger.log("WALK: " + getWalkscore("***REDACTED***"));
  Logger.log("BIKE: " + getBikescore("***REDACTED***"));

}
