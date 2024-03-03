document.addEventListener("DOMContentLoaded", async function() {

   let singapore = [1.29, 103.85]; // Singapore's latlng
   let map = L.map("map").setView(singapore, 11); // set the map's centre
   // use layer from OneMap
   let openStreetLayer = L.tileLayer(
   'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
   {maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

   // use layer from Esri
   let esriLayer = L.tileLayer(
   'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
   {maxZoom: 18, attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
   }).addTo(map);

   let response = await axios.get("./data/cycling-path.geojson");
   let cyclingLayer = L.geoJson(response.data, {
      // the onEachFeature function is executed on each feature from the GeoJSON file
      // parameter 1: the feature object (from the geoJSON file)
      // parameter 2: the leaflet visual representation of that feature
      onEachFeature:function(feature, layer) {
         const tempElement = document.createElement('div');
         tempElement.innerHTML = feature.properties.Description;
         const tds = tempElement.querySelectorAll('td');
         const pathName = tds[0].innerHTML;
         const agency = tds[1].innerHTML;
         layer.bindPopup(`<strong>${pathName}</strong><p>Maintained by: ${agency}`);
      }
   }).addTo(map);

   // set color of cycling layer
   cyclingLayer.setStyle({
      'color':'orange'
   })

   let railResponse = await axios.get("./data/master-plan-rail-line.geojson");
   let railLayer = L.geoJson(railResponse.data, {
      // the onEachFeature function is executed on each feature from the GeoJSON file
      // parameter 1: the feature object (from the geoJSON file)
      // parameter 2: the leaflet visual representation of that feature
      onEachFeature:function(feature, layer) {
         const tempElement = document.createElement('div');
         tempElement.innerHTML = feature.properties.Description;
         const tds = tempElement.querySelectorAll('td');
         const groundType = tds[0].innerHTML;
         const railType = tds[1].innerHTML;
         layer.bindPopup(`<strong>${railType} - ${groundType}</strong>`);
      }
   }).addTo(map);

   // set color of cycling layer
   railLayer.setStyle({
      'color':'skyblue'
   })
   
   const bedokResponse = await axios.get("./data/bedok-boundary.geojson");

   // Create a GeoJSON object for the bedok polygon
   let bedokGeoJSON = {
       "type": "Feature",
       "properties": {},
       "geometry": {
           "type": "Polygon",
           "coordinates": [bedokResponse.data] // Wrap the array of coordinates in another array
       }
   };

   // Add the GeoJSON layer to the map
   L.geoJSON(bedokGeoJSON, {
       style: function(feature) {
           return {color: "blue", weight: 3, opacity: 0.5}; // Example style
       }
   }).addTo(map);

}
)