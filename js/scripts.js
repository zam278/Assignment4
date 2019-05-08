// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiemFtMjc4IiwiYSI6ImNqdWQ5YWpneDBzbGQ0ZW5xOGtzcDJ0OGcifQ.PqU5et-zFUgXyhIeGuueqg';

// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-73.951,40.728],
  zoom: 14,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
