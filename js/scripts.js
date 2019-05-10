// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';

// creaate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-73.991890,40.748753],
  zoom: 12,
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
//<=========!!============>//
// Chinca town Location, 1st center
// var popup1 = new mapboxgl.Popup({ offset: 40 })
// //HTML  .setText('Iconic Film Location!');
//
// new mapboxgl.Marker()
//   .setLngLat([-74.0037028, 40.7129173])
//   .setPopup(popup1)
//   .addTo(map);
//   //<=========!!============>//
// // Lenox Hill location1
// var popup2 = new mapboxgl.Popup({ offset: 40 })
// //  .setText('Iconic Film Location!');
//
// new mapboxgl.Marker()
//   .setLngLat([-74.0059089, 40.7128346])
//   .setPopup(popup2)
//   .addTo(map);
//   //<=========!!============>//
// //Lenox Hill Location 2
//   var popup3 = new mapboxgl.Popup({ offset: 40 })
//   //  .setText('Iconic Film Location!');
//
//   new mapboxgl.Marker()
//     .setLngLat([-73.9666876,40.7682952])
//     .setPopup(popup3)
//     .addTo(map);
//     //<=========!!============>//
// // East Harlem Action Center Location
//   var popup4 = new mapboxgl.Popup({ offset: 40 })
//     //  .setText('Iconic Film Location!');
//
//     new mapboxgl.Marker()
//       .setLngLat([-73.944093, 40.797606])
//       .setPopup(popup4)
//       .addTo(map);
//       //<=========!!============>//
// // FAmily Health Center Location
//     var popup5 = new mapboxgl.Popup({ offset: 40 })
//       //  .setText('Iconic Film Location!');
//
//       new mapboxgl.Marker()
//         .setLngLat([-73.9459587, 40.8018631])
//         .setPopup(popup5)
//         .addTo(map);
// //<=========!!============>//
// //Uptown Grand Central Location
//     var popup6 = new mapboxgl.Popup({ offset: 40 })
//       //  .setText('Iconic Film Location!');
//
//       new mapboxgl.Marker()
//         .setLngLat([-73.9413772, 40.8051344])
//         .setPopup(popup6)
//         .addTo(map);
// //<=========!!============>//

//to create a loop for the marker; every for loop it has to start and end with {}
freshBox.forEach(function(freshBoxData) {
// to add a marker for each feature
  new mapboxgl.Marker({
    color: 'blue',
  })
    .setLngLat([freshBoxData.lng, freshBoxData.lat])
    .setPopup(new mapboxgl.Popup({ offset: 40 })
      .setHTML('<h4>' + freshBoxData.site_name +'</h4><p>' + "Day: " + freshBoxData.day + '</p><p>'+ "Operating hours: " +
        freshBoxData.hours + '</p><p>' + "Coordinator: " +
        freshBoxData.coordinator + '</p>' ))
    .addTo(map);


})

// a helper function for looking up colors and descriptions for NYC land use codes
var LandUseLookup = (code) => {
  switch (code) {
    case 1:
      return {
        color: '#f4f455',
        description: '1 & 2 Family',
      };
    case 2:
      return {
        color: '#f7d496',
        description: 'Multifamily Walk-up',
      };
    case 3:
      return {
        color: '#FF9900',
        description: 'Multifamily Elevator',
      };
    case 4:
      return {
        color: '#f7cabf',
        description: 'Mixed Res. & Commercial',
      };
    case 5:
      return {
        color: '#ea6661',
        description: 'Commercial & Office',
      };
    case 6:
      return {
        color: '#d36ff4',
        description: 'Industrial & Manufacturing',
      };
    case 7:
      return {
        color: '#dac0e8',
        description: 'Transportation & Utility',
      };
    case 8:
      return {
        color: '#5CA2D1',
        description: 'Public Facilities & Institutions',
      };
    case 9:
      return {
        color: '#8ece7c',
        description: 'Open Space & Outdoor Recreation',
      };
    case 10:
      return {
        color: '#bab8b6',
        description: 'Parking Facilities',
      };
    case 11:
      return {
        color: '#5f5f60',
        description: 'Vacant Land',
      };
    case 12:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
    default:
      return {
        color: '#5f5f60',
        description: 'Other',
      };
  }
};

// mapboxgl paint properties for NYC land use codes
var landUsePaint = {
  'fill-opacity': 0.7,
  'fill-color': {
    type: 'categorical',
    property: 'landuse',
    stops: [
        [
          '01',
          LandUseLookup(1).color,
        ],
        [
          "02",
          LandUseLookup(2).color,
        ],
        [
          "03",
          LandUseLookup(3).color,
        ],
        [
          "04",
          LandUseLookup(4).color,
        ],
        [
          "05",
          LandUseLookup(5).color,
        ],
        [
          "06",
          LandUseLookup(6).color,
        ],
        [
          "07",
          LandUseLookup(7).color,
        ],
        [
          "08",
          LandUseLookup(8).color,
        ],
        [
          "09",
          LandUseLookup(9).color,
        ],
        [
          "10",
          LandUseLookup(10).color,
        ],
        [
          "11",
          LandUseLookup(11).color,
        ],
      ]
    }
}

// use jquery to programmatically create a Legend
// for numbers 1 - 11, get the land use color and description
for (var i=1; i<12; i++) {
  // lookup the landuse info for the current iteration
  const landuseInfo = LandUseLookup(i);

//   new mapboxgl.Marker({
//   color: 'green',
// })
//   .setLngLat([filmData.lon, filmData.lat])
//   .setPopup(new mapboxgl.Popup({ offset: 40 })
//     .setHTML('<h4>' + filmData.description +'</h4><p>' + "Year: " + filmData.year + '</p><p>'+ "Rating: " +
//       filmData.rate + " out of 10" + '</p><p>' + "location: " +
//       filmData.location + '</p>' ))
//   .addTo(map);




  // this is a simple jQuery template, it will append a div to the legend with the color and description
  $('.legend').append(`
    <div>
      <div class="legend-color-box" style="background-color:${landuseInfo.color};"></div>
      ${landuseInfo.description}
    </div>
  `)
}

// a little object for looking up neighborhood center points
var neighborHoodLookup = {
  'china-town': [-74.003660, 40.713034],
  'lenox-Hill': [-73.9732269, 40.7682908],
  'upper-east-side': [-73.9666769, 40.7682912],
  'east-harlem': [-73.942988,40.794140],
}

// we can't add our own sources and layers until the base style is finished loading
map.on('style.load', function() {
  // add a button click listener that will control the map
  // we have 4 buttons, but can listen for clicks on any of them with just one listener
  $('.flyto').on('click', function(e) {
    // pull out the data attribute for the neighborhood using query
    var neighborhood = $(e.target).data('neighborhood');

    // this is a useful notation for looking up a key in an object using a variable
    var center = neighborHoodLookup[neighborhood];

    // fly to the neighborhood's center point
    map.flyTo({center: center, zoom: 14});
  });

  // let's hack the basemap style a bit
  // you can use map.getStyle() in the console to inspect the basemap layers
  map.setPaintProperty('water', 'fill-color', '#a4bee8')

  // this sets up the geojson as a source in the map, which I can use to add visual layers
  map.addSource('china-town', {
    type: 'geojson',
    data: './data/china-town.geojson',
  });

  // add a custom-styled layer for tax lots
 map.addLayer({
   id: 'china-town-lots-fill',
   type: 'fill',
   source: 'china-town',
   paint: landUsePaint
 }, 'waterway-label')

 // add an outline to the tax lots which is only visible after zoom level 14.8
 map.addLayer({
   id: 'china-town-lots-line',
   type: 'line',
   source: 'china-town',
   paint: {
     'line-opacity': 0.7,
     'line-color': 'gray',
     'line-opacity': {
       stops: [[14, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
     }
   }
 });


 // add an empty data source, which we will use to highlight the lot the user is hovering over
 map.addSource('highlight-feature', {
   type: 'geojson',
   data: {
     type: 'FeatureCollection',
     features: []
   }
 })

 // add a layer for the highlighted lot
 map.addLayer({
   id: 'highlight-line',
   type: 'line',
   source: 'highlight-feature',
   paint: {
     'line-width': 3,
     'line-opacity': 0.9,
     'line-color': 'black',
   }
 });

 // when the mouse moves, do stuff!
 map.on('mousemove', function (e) {
   // query for the features under the mouse, but only in the lots layer
   var features = map.queryRenderedFeatures(e.point, {
       layers: ['china-town-lots-fill', 'east-harlem-lots-fill', 'upper-east-side-lots-fill','lenox-Hill-lots-fill'],
   });

   // get the first feature from the array of returned features.
   var lot = features[0]


   if (lot) {  // if there's a lot under the mouse, do stuff
     map.getCanvas().style.cursor = 'pointer';
 // make the cursor a pointer

     // lookup the corresponding description for the land use code
     var landuseDescription = LandUseLookup(parseInt(lot.properties.landuse)).description;

     // use jquery to display the address and land use description to the sidebar
     $('#address').text(lot.properties.address);
     $('#yearbuilt').text(lot.properties.yearbuilt);
     $('#landuse').text(landuseDescription);

     // set this lot's polygon feature as the data for the highlight source
     map.getSource('highlight-feature').setData(lot.geometry);
   } else {
     map.getCanvas().style.cursor = 'default'; // make the cursor default

     // reset the highlight source to an empty featurecollection
     map.getSource('highlight-feature').setData({
       type: 'FeatureCollection',
       features: []
     });
   }
 })

})
///////////////////////////////////////////////////////////////////////////////////////////////
// we can't add our own sources and layers until the base style is finished loading
map.on('style.load', function() {
  // add a button click listener that will control the map
  // we have 4 buttons, but can listen for clicks on any of them with just one listener
  $('.flyto').on('click', function(e) {
    // pull out the data attribute for the neighborhood using query
    var neighborhood = $(e.target).data('neighborhood');

    // this is a useful notation for looking up a key in an object using a variable
    var center = neighborHoodLookup[neighborhood];

    // fly to the neighborhood's center point
    map.flyTo({center: center, zoom: 14});
  });

  // let's hack the basemap style a bit
  // you can use map.getStyle() in the console to inspect the basemap layers
  map.setPaintProperty('water', 'fill-color', '#a4bee8')

  // this sets up the geojson as a source in the map, which I can use to add visual layers
  map.addSource('east-harlem', {
    type: 'geojson',
    data: './data/east-harlem.geojson',
  });

  // add a custom-styled layer for tax lots
 map.addLayer({
   id: 'east-harlem-lots-fill',
   type: 'fill',
   source: 'east-harlem',
   paint: landUsePaint,
 }, 'waterway-label')

 // add an outline to the tax lots which is only visible after zoom level 14.8
 map.addLayer({
   id: 'east-harlem-lots-line',
   type: 'line',
   source: 'east-harlem',
   paint: {
     'line-opacity': 0.7,
     'line-color': 'gray',
     'line-opacity': {
       stops: [[14, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
     }
   }
 });

///////////////////////////////////
// this sets up the geojson as a source in the map, which I can use to add visual layers
map.addSource('lenox-Hill', {
  type: 'geojson',
  data: './data/lenox-Hill.geojson',
});

// add a custom-styled layer for tax lots
map.addLayer({
 id: 'lenox-Hill-lots-fill',
 type: 'fill',
 source: 'lenox-Hill',
 paint: landUsePaint,
}, 'waterway-label')

// add an outline to the tax lots which is only visible after zoom level 14.8
map.addLayer({
 id: 'lenox-Hill-lots-line',
 type: 'line',
 source: 'lenox-Hill',
 paint: {
   'line-opacity': 0.7,
   'line-color': 'gray',
   'line-opacity': {
     stops: [[14, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
   }
 }
});
////////////////////////
// this sets up the geojson as a source in the map, which I can use to add visual layers
map.addSource('upper-east-side', {
  type: 'geojson',
  data: './data/upper-east-side.geojson',
});

// add a custom-styled layer for tax lots
map.addLayer({
 id: 'upper-east-side-lots-fill',
 type: 'fill',
 source: 'upper-east-side',
 paint: landUsePaint,
}, 'waterway-label')

// add an outline to the tax lots which is only visible after zoom level 14.8
map.addLayer({
 id: 'upper-east-side-lots-line',
 type: 'line',
 source: 'upper-east-side',
 paint: {
   'line-opacity': 0.7,
   'line-color': 'gray',
   'line-opacity': {
     stops: [[14, 0], [14.8, 1]], // zoom-dependent opacity, the lines will fade in between zoom level 14 and 14.8
   }
 }
});
 
})
