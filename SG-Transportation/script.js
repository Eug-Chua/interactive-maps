
document.addEventListener("DOMContentLoaded", async function() {
    // create map
    let singapore = [1.29, 103.85]; // Singapore's latlng
    let map = L.map("singaporeMap").setView(singapore, 12);

    // use layer from OneMap
    let openStreetLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
    
    // use layer from Esri
    let esriLayer = L.tileLayer(
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {maxZoom: 18, attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
    
    // add the maps to a layer for us to switch on and off
    let baseMaps = {
        "Map": openStreetLayer,
        "Satellite": esriLayer
    };
    L.control.layers(baseMaps).addTo(map);

    // load taxi coordinates
    const taxiPositions = await loadTaxi();

    // initiate empty cluster group for taxi coordinates
    const taxiCluster = L.markerClusterGroup();
    taxiCluster.addTo(map);
    
    drawTaxi(taxiPositions, taxiCluster);
 
    // redraw taxi positions every 30 seconds
    setInterval(async function() {
        taxiCluster.clearLayers();
        const taxiPositions = await loadTaxi();
        drawTaxi(taxiPositions, taxiCluster);
    }, 30 * 1000)

    // initiate empty layer group for MRT station coordinates
    const mrtLayer = L.layerGroup();
    mrtLayer.addTo(map);

    fetchAndDrawMrt(mrtLayer)

    // define layers for toggling
    let baseLayers = {
        "Taxis":taxiCluster
    }

    let overlays = {
        "MRT":mrtLayer
    }

    L.control.layers(
        baseLayers,
        overlays
        ).addTo(map);

    document.querySelector("#taxi-btn").addEventListener("click", function(){
        if (map.hasLayer(taxiCluster)) {
            map.removeLayer(taxiCluster)
        } else {
            map.addLayer(taxiCluster)
        }
    })

    document.querySelector("#mrt-btn").addEventListener("click", function(){
        if (map.hasLayer(mrtLayer)) {
        map.removeLayer(mrtLayer)
    } else {
        map.addLayer(mrtLayer)
    }
    })
}
)

// create taxi icon 
let taxiIcon = L.icon({
 iconUrl: 'images/taxi.png',
 iconSize: [30, 30]
 });

 // create MRT icon 
let mrtIcon = L.icon({
iconUrl: 'images/mrt-logo.png',
iconSize: [25, 25]
});

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

async function loadTaxi(){
    // load in coordinates of all available taxis from the API
    const response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    return response.data.features[0].geometry.coordinates;
}

async function loadMrt() {
    const response = await axios.get("mrt.json")
    return response.data
}

function addMrtMarkers(data, mrtLayer) {
    data.forEach(function(station) {
        let marker = L.marker([station.lat, station.long], {
            icon: mrtIcon,
            title: station.name
        }).bindPopup(`<strong>${station.name}</strong>`).addTo(mrtLayer);
    });
}

function fetchAndDrawMrt(mrtLayer) {
    fetch('mrt.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            addMrtMarkers(data, mrtLayer);
        });
}
