import Axios from 'axios';

export default class ForwardGeocodingService
{


    search(query, callback) {

        const accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5wb3J0IiwiYSI6ImNrZnR5aWk4cDB3ZjEycHBkbnZnMHhnNHQifQ.PidFMxwHKmlO8kHgcd67Sw';

        query = this.buildQuery(query);

        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
            params: {
                access_token: accessToken,
            },
        })
        .then(results => {

            callback(this.buildResults(results.data));

        })
        .catch(error => {
            console.log(error);
        });

    }

    buildQuery(query) {

        // Remove special characters
        query = query.replace(/[^a-zA-Z ]/g, '');

        // Convert to query string
        query = encodeURIComponent(query);

        return query;

    }

    buildResults(results) {

        return results;

    }


}
