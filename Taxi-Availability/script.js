document.addEventListener("DOMContentLoaded", async function() {
      // create map
   let singapore = [1.29, 103.85]; // Singapore's latlng
   let map = L.map("map").setView(singapore, 12);

   L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Grey/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 19,
      minZoom: 10,
      /** DO NOT REMOVE the OneMap attribution below **/
      attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
   }).addTo(map);
   
   const taxiPositions = await loadTaxi();

   const taxiCluster = L.markerClusterGroup();
   taxiCluster.addTo(map);

   drawTaxi(taxiPositions, taxiCluster);
   
   // redraw every 30 seconds
   setInterval(async function() {
      taxiCluster.clearLayers();

      const taxiPositions = await loadTaxi();

      drawTaxi(taxiPositions, taxiCluster);

   }, 20 * 1000) 
}
)

// create taxi icon 
let taxiIcon = L.icon({
   iconUrl: 'taxi.png',
   iconSize: [30, 15]
   });

async function loadTaxi(){
   // load in coordinates of all available taxis from the API
   const response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
   return response.data.features[0].geometry.coordinates;
}

function drawTaxi(taxiPositions, taxiCluster) {
   // create one marker for each coordinate
   for (let taxi of taxiPositions) {
      // create coordinate for each taxi
      const coordinate = [taxi[1], taxi[0]];
      // create marker for each taxi - using icon
      const marker = L.marker(coordinate, {icon: taxiIcon}).addTo(taxiCluster);
      // add marker to the taxi cluster
      marker.addTo(taxiCluster)
   }
}