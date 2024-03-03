/**
 * Create a map object
 * @param {string} mapContainerID ID of element that will display map
 * @param {Number} lat Latitude
 * @param {Number} lng Longitude
 * @returns An object representing the Leaflet map
 */
function createMap(mapContainerID, lat, lng) {
    let map = L.map(mapContainerID).setView([lat, lng], 13);

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

    return map;
}

/**
 * Add markers to search results
 * @param {[*]} searchResults Array caontaining search results from the search() function
 * @param {*} layer Leaflet/Esri layer 
 */

function addMarkersToMap(searchResults, layer, map) {
        // format to get lat lng from 4Square results: x.results[0].geocodes.main.longitude

        // remove all existing markers from the existing layer
        layer.clearLayers();

        // fill in search results with the a list of search results
        const searchResultOutput = document.querySelector("#search-results");
        searchResultOutput.innerHTML = ""

        // take one location at a time from data.results
        for (let location of searchResults.results) {
            // Part A: create a marker for that location
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            const name = location.name;
            const address = location.location.address;
            const marker = L.marker([lat, lng]);
            marker.bindPopup(`<strong>${name}</strong><p>${address}</p>`);

            // add the marker to the map
            marker.addTo(layer);

            // Part B: Create and display the search results
            // 2. create an element to hold/contain the results
            const divElement = document.createElement('div');
            
            // 3. add the element to the result element
            divElement.innerHTML = location.name;
            divElement.addEventListener("click", function() {
                const lat = location.geocodes.main.latitude;
                const lng = location.geocodes.main.longitude;
                // make the map center onto the clicked search result
                map.flyTo([lat, lng], 15);
                marker.openPopup();
            })
            searchResultOutput.appendChild(divElement);
        }
}