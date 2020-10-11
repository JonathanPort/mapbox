import Axios from 'axios';
import MapboxLocationModel from './MapboxLocationModel';

export default class ForwardGeocodingService
{

    constructor(key) {
        this.mapboxKey = key;
    }

    search(query, callback) {

        query = this.buildQuery(query);

        Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
            params: {
                access_token: this.mapboxKey,
            },
        })
        .then(results => {

            const models = [];
            const data = results.data.features;

            if (typeof data !== 'object') callback([]);

            for (let i = 0; i < data.length; i++) models.push(new MapboxLocationModel(data[i]));

            return callback(models);

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

}
