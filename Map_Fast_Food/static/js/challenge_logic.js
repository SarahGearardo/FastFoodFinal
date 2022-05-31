// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the third tile layer that will be the background of our map.
let navigationNight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": navigationNight
};

// 1. Add a 2nd layer group for the tectonic plate data.
var allEarthquakes = new L.LayerGroup();
var TectonicPlates = new L.LayerGroup();
var MajorEQ = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Tectonic Plates": TectonicPlates,
  "Major Earthquakes": MajorEQ,
  "Earthquakes": allEarthquakes,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the airport GeoJSON URL
let FFData = "https://raw.githubusercontent.com/SarahGearardo/FastFoodFinal/Deep_Ghosh/Map_Fast_Food/res_types.json";

d3.json(FFData).then(function(data) {
    console.log(data);
  L.geoJson(data).addTo(map);
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.median),
      color: "#000000",
      radius: getRadius(feature.median),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(median) {
    if (median > 50000) {
      return "#ea2c2c";
    }
    if (median > 40000) {
      return "#ea822c";
    }
    if (median > 30000) {
      return "#ee9c00";
    }
    if (median > 20000) {
      return "#eecc00";
    }
    if (median > 10000) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(median) {
    if (median === 0) {
      return 1;
    }
    return median * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      	console.log(data);
      	return L.circleMarker(latlng);
      },

      // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
     // We create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Median: " + feature.median + "<br>Location: " + feature.res_name);
    }
  }).addTo(allEarthquakes);
                          // Then we add the earthquake layer to our map.
    allEarthquakes.addTo(map);
});

        // 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json(FFData).then(function(data) {
      // 4. Use the same style as the earthquake data.
  function styleMajEQ(feature) {
      return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getCol(feature.median),
      color: "#000000",
      radius: getRad(feature.median),
      stroke: true,
      weight: 0.5
      };
    }
  
      // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
  function getCol(median) {
        if (median > 6) {
          return "#2c35a";
        }
        if (median > 5) {
          return "#2c88ea"; 
        }
        return "#2cd4ea";
  }
      
    // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRad(median) {
      if (median === 0) {
      return 1;
      }
      return median * 4;
  }
   // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
   // sets the style of the circle, and displays the magnitude and location of the earthquake
   //  after the marker has been created and styled.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },
    style: styleMajEQ,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Median: " + feature.median + "<br>Location: " + feature.res_name);
    }
    }).addTo(MajorEQ);
    // 8. Add the major earthquakes layer to the map.
      MajorEQ.addTo(map);
    // 9. Close the braces and parentheses for the major earthquake data. 
});

  // Here we create a legend control object.
let legend = L.control({
  position: "bottomright"
});

  // Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};

  // Finally, we our legend to the map.
  legend.addTo(map);

  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
d3.json(FFData).then(function(data) {
   
  function styleTectonic(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ea2ce4",
        color: "#ea2ce4",
        stroke: true,
        weight: 5
      };
  }
    
  L.geoJson(data, {
    style: styleTectonic,  
    }).addTo(TectonicPlates);
    TectonicPlates.addTo(map)
});
