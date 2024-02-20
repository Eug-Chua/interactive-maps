let singapore = [1.29, 103.85]; // Singapore's latlng
let map = L.map("map").setView(singapore, 12); // set the map's centre


L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Grey/{z}/{x}/{y}.png', {
   detectRetina: true,
   maxZoom: 19,
   minZoom: 11,
   /** DO NOT REMOVE the OneMap attribution below **/
   attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
}).addTo(map);


let singaporeMarker = L.marker([1.29, 103.85]);
singaporeMarker.addTo(map)

singaporeMarker.bindPopup("<h1>Singapore</h1>")

singaporeMarker.addEventListener("click", function(){
    alert("Singapore");
})

let circle = L.circle([1.35166526, 103.773663572], {
    color: "orange", 
    fillColor: "orange", 
    fillOpacity:0.5,
    radius: 500
})

circle.addTo(map);

let mrtLatLng = [1.33315281585758, 103.742286332403]

let mrtMarkers = L.circle(mrtLatLng, {
    color:"green",
    fillColor:"orange",
    fillOpacity:0.5,
    radius:300
})

mrtMarkers.addTo(map);

