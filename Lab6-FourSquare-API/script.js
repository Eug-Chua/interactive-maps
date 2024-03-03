document.addEventListener("DOMContentLoaded", function() {
    const singaporeLat = 1.2907
    const singaporeLng = 103.8517
    const map = createMap("map", singaporeLat, singaporeLng)
    
    const searchLayer = L.layerGroup();
    searchLayer.addTo(map);

    async function performSearch() {
        // obtain the search results
        const searchTerms = document.querySelector("#searchTerms").value;
        
        // obtain the map's center point 
        const mapCenter = map.getBounds().getCenter();
        // get search results of the map's center point
        const data = await search(mapCenter.lat, mapCenter.lng, searchTerms);

        // add search results' markers to map
        addMarkersToMap(data, searchLayer, map);
    }
    
    // Listen for click to perform search
    document.querySelector("#searchBtn").addEventListener("click", async function(){
        await performSearch();
    })

     // Listen for the Enter key press on the #searchTerms input field
    document.querySelector("#searchTerms").addEventListener("keypress", async function(e){
        if(e.key === "Enter") {
            e.preventDefault(); // Prevent the default action to avoid any form submission or other undesired behavior
            await performSearch();
        }
    })

    document.querySelector("#toggleSearchBtn").addEventListener("click", async function(){
        const searchContainer = document.querySelector("#search-container");
        const style = window.getComputedStyle(searchContainer);

        if (style.display != "none") {
            searchContainer.style.display = "none";
        } else {
            searchContainer.style.display = "flex";
        }
    })
})