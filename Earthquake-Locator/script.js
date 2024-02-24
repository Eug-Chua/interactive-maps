document.addEventListener("DOMContentLoaded", async function() {
    const map = L.map("map");
    map.setView([1.3526, 103.8352], 5);
    
    // create a tile layer
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

    
    // load in all the available volcano locations
    const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson") 
    
    // initiate the cluster group
    const cluster = L.markerClusterGroup();
    cluster.addTo(map);

    let volcanoIcon = L.icon({
        iconUrl:"earthquake.png",
        iconSize:[70, 50]
    });
    
    // create one marker for each coordinate pair
    for (let earthquake of response.data.features) {
        let coordinate = earthquake.geometry.coordinates;
        console.log(coordinate);
        let locationName = earthquake.properties.place;
        let marker = L.marker([coordinate[1], coordinate[0]], {icon:volcanoIcon});
        marker.bindPopup(`<h5>${locationName}</h5>`);
        marker.addTo(cluster);
    }
})
