// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with the geographical center of the Earth
// let map = L.map('mapid').setView([30,30],2);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// // Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + "</h2>")
//   }
// }).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   onEachFeature : function(feature,layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>" + "Airport code : "+ feature.properties.faa + "</h2> <hr> <h2> " + "Airport name :" +feature.properties.name +"</h2>");
//       }
// }).addTo(map);

// Add a marker to the map for Los Angeles , California
// L.circle([34.0522, -118.2437], {
//     radius: 100
//  }).addTo(map);

// Cordinates for each point to be used in the polyline 
let line = [
    [33.9416,-118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
  [47.4502, -122.3088]
];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "yellow"
//   }).addTo(map);

// Get data from cities.js
let cityData = cities;
console.log(cityData);


// Using the circle marker
// L.circleMarker([34.0522, -118.2437], {
//     radius : 300,
//     color : "black",
//     fillColor : '#ffffa1'
// }).addTo(map);

 // Loop through the cities array and create one marker for each city.
//  cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location,{
//         radius:city.population/100000
        
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString()  + "</h3>")
//     .addTo(map);
//    });
   
// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {    
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18, 
// id: 'mapbox.streets',
accessToken: API_KEY
});
// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);


// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL  
let airportData = "https://raw.githubusercontent.com/Akshaya-Kamble/Mapping_Earthquakes/main/Module/majorAirports.json";  

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  onEachFeature : function(feature,layer) {
layer.bindPopup("<h2>" + "Airport code : "+ feature.properties.faa + "</h2> <hr> <h2> " + "Airport name :" +feature.properties.name +"</h2>");
}
}).addTo(map);
});