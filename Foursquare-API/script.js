document.addEventListener("DOMContentLoaded", function() {
    const map = createMap('map', 1.3521, 103.9198)

    document.querySelector('#searchBtn').addEventListener("click", async function() {
        const searchTerms = document.querySelector("#searchTerms").ariaValueMax;
        const data = await search(1.352, 103.8198, searchTerms);
        console.log(data);

        // add markers:
        // Example of how to get latlng from the Foursquare results: x.results[0].geocodes.main.longitude
        // take one locatio at a time from data.results
        for (let locaiton of data.results) {
            // create a marker for that location
            const lat = location.geocodes.main.latitude;
            const lng = location.geocodes.main.longitude;
            const address = location.location.formatted_address;
            const marker = L.marker((lat, lng));
            marker.bindPopup(`<p>${address}</p>`)
            // add the marker to the map
            marker.addTo(map);
            // repeat
            
        }
        
    })
});

