async function search(lat, lng, searchTerms) {

    const response = axios.get('https://api.foursquare.com/v3/places/search',{
        params: {
            query: encodeURI(searchTerms),
            ll: lat + "," + lng,
            // categories: 'bubble%20tea', // enable use of categories
            sort: 'DISTANCE',
            radius: 1000,
            limit: 50
        },
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3wvrfpqkDVDYXv4sfsswHSsOCGihsmqDm8J7asPKmus8='
        }
    })
    return response.data;
};


