document.addEventListener("DOMContentLoaded", async function () {
   
    // setup the map
    const map = L.map("singaporeMap");
    map.setView([1.3521, 103.8198], 11);
    L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Original/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 11,
    /** DO NOT REMOVE the OneMap attribution below **/
    attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
}).addTo(map);

    const cyclingResponse = await axios.get('./data/cycling.geojson');
    const cyclingLayer = L.geoJson(cyclingResponse.data, {
        // the onEachFeature function is executed on each feature from the GeoJSON file
        // parameter 1: the feature object (from the geoJSON file)
        // parameter 2: the leaflet visual representation of that feature
        onEachFeature:function(feature, layer) {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = feature.properties.Description;
            const tds = tempElement.querySelectorAll('td');
            const pathName = tds[0].innerHTML;
            const agency = tds[1].innerHTML;
            layer.bindPopup(`<h3>${pathName}</h3><p>Maintined by: ${agency}</p>`);
        }
    }).addTo(map);
    cyclingLayer.setStyle({
        color:'orange'
    })
})