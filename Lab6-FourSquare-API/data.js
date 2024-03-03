async function search(lat, lng, searchTerms) {
    const response = await axios.get("https://api.foursquare.com/v3/places/search", {
        params: {
            query: encodeURI(searchTerms), //encodeURI function to convert special characters so query will be well-formed
            ll: lat + "," + lng, // strathmore latlng: 1.2931, 103.809 
            sort: 'DISTANCE',
            radius:2000,
            limit: 20,
            // categories:"13032"
            // near:"Singapore",
        },
        headers:{
            accept:'application/json',
            Authorization: 'fsq3wvrfpqkDVDYXv4sfsswHSsOCGihsmqDm8J7asPKmus8='
        }
    })
    return response.data;
}


