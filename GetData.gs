/**
* Appscript to get data for apartment finder.
* 
* author: Xavier Collantes (collantes.xavier@gmail.com)
*/

walkResponse = "";
WALK_API_KEY = _getWalkscoreApiKey();
GOOGLE_MAPS_KEY = _getGoogleMapsApiKey();

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


/**
* Walkability Score (walkscore.com) from 0 - 100.
* 
* @param {text} address Full address, city, zip code as a single text.
* @return Walkscore. 
* @customfunction
*/
function WALKSCORE(address){
  jsonResponse = _getWalkscoreResponseHandler(address);
  Logger.log(jsonResponse);
  return jsonResponse["walkscore"];
}


/**
* Bike accessibility rating from Walkability Score (walkscore.com) from 0 - 100.
* 
* @param {text} address Full address, city, zip code as a single text.
* @return Bikescore. 
* @customfunction
*/
function BIKESCORE(address){
  jsonResponse = _getWalkscoreResponseHandler(address);
  Logger.log(jsonResponse);
  return jsonResponse["bike"].score;
}


function _getWalkscoreApiKey(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var walkscoreCell = ss.getRange("api_keys!B1");
  
  return walkscoreCell.getValue();
}


/**
* GOOGLE MAPS FUNCTIONS
*/


function _getGoogleMapsApiKey(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var googleMapsCell = ss.getRange("api_keys!B2");
  
  return googleMapsCell.getValue();
}


/**
* Travel distance between two addresses. Source: Google Maps.
* 
* @param {text} origin Origin address.
* @param {text} destination Destination address.
* @param {text} api_key Google Maps API key. developers.google.com/maps/documentation/distance-matrix/get-api-key
* @param {text} mode OPTIONAL. Type of transportation: "driving" (default), "walking", "bicycling", or "transit". 
* @param {text} arrival_time OPTIONAL. Specifies the desired time of arrival for transit requests, in seconds since midnight, January 1, 1970 UTC. You can specify either departure_time or arrival_time, but not both. 
* @param {text} departure_time OPTIONAL. The desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC. Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).  
* @param {text} avoid OPTIONAL. Route restrictions: Avoid the following "tolls", "highways", "ferries", or "indoors". 
* @param {text} units OPTIONAL. Choose between "imperial" (default) or "metric". 
* @return Duration as a text in imperial units. 
* @customfunction
*/
function GOOGLE_MAPS_DISTANCE(origin, destination, api_key, mode, arrival_time, departure_time, avoid, units){
  if (units == null){
    units = "imperial";
  };
  
  var url = encodeURI("https://maps.googleapis.com/maps/api/distancematrix/json" + 
                      "?units=" + `${units}` + 
                      "&origins=" + `${origin}` + 
                      "&destinations=" + `${destination}` +
                      "&arrival_time=" + `${arrival_time}` + 
                      "&departure_time=" + `${departure_time}` + 
                      "&avoid=" + `${avoid}` +
                      "&mode=" + `${mode}` +
                      "&key=" + `${api_key}`);
  
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);

  return jsonResponse.rows[0].elements[0].distance.text;
}


/**
* Travel time between two addresses. Source: Google Maps.
* 
* @param {text} origin Origin address.
* @param {text} destination Destination address.
* @param {text} api_key Google Maps API key. developers.google.com/maps/documentation/distance-matrix/get-api-key
* @param {text} mode OPTIONAL. Type of transportation: "driving" (default), "walking", "bicycling", or "transit". 
* @param {text} arrival_time OPTIONAL. Specifies the desired time of arrival for transit requests, in seconds since midnight, January 1, 1970 UTC. You can specify either departure_time or arrival_time, but not both. 
* @param {text} departure_time OPTIONAL. The desired time of departure. You can specify the time as an integer in seconds since midnight, January 1, 1970 UTC. Alternatively, you can specify a value of now, which sets the departure time to the current time (correct to the nearest second).  
* @param {text} avoid OPTIONAL. Route restrictions: Avoid the following "tolls", "highways", "ferries", or "indoors". 
* @param {text} units OPTIONAL. Choose between "imperial" (default) or "metric". 
* @return Duration as a text in imperial units. 
* @customfunction
*/
function GOOGLE_MAPS_DURATION(origin, destination, api_key, mode, arrival_time, departure_time, avoid, units){
  if (units == null){
    units = "imperial";
  };
  
  var url = encodeURI("https://maps.googleapis.com/maps/api/distancematrix/json" + 
                      "?units=" + `${units}` + 
                      "&origins=" + `${origin}` + 
                      "&destinations=" + `${destination}` +
                      "&arrival_time=" + `${arrival_time}` + 
                      "&departure_time=" + `${departure_time}` + 
                      "&avoid=" + `${avoid}` +
                      "&mode=" + `${mode}` +
                      "&key=" + `${api_key}`);
  
  var response = UrlFetchApp.fetch(url);

  textResponse = response.getContentText();
  jsonResponse = JSON.parse(textResponse);

  return jsonResponse.rows[0].elements[0].duration.text;
}




function test(){
  //Logger.log(_geoencode("1021 Mercer St, Seattle, WA 98109"));
  //Logger.log("WALK: " + getWalkscore("1021 Mercer St, Seattle, WA 98109"));
  //Logger.log("BIKE: " + getBikescore("1021 Mercer St, Seattle, WA 98109"));
  
  //Logger.log(_getWalkscoreApiKey());

}
