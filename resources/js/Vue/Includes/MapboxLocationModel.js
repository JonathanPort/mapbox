export default class MapboxLocationModel
{

    constructor(mapboxApiResult) {

        this._result = mapboxApiResult;

    }


    get coordinates() {

        return this._result.geometry.coordinates;

    }

    get center() {

        return this._result.center;

    }

    get border() {

        return this._result.bbox;

    }

    get type() {

        return this._result.place_type[0];

    }

    get shortText() {

        return this._result.text;

    }

    get fullText() {

        return this._result.place_name;

    }

    get context() {

        return this._result.context;

    }

    get id() {

        return this._result.id;

    }

    get icon() {

        let icon = 'default';

        switch (this.type) {

            case 'country':
                icon = 'country';
                break;
            case 'place':
                icon = 'place';
                break;
            case 'region':
                icon = 'region';
                break;
            case 'district':
                icon = 'district';
                break;
            case 'locality':
                icon = 'locality';
                break;
            case 'neighborhood':
                icon = 'neighborhood';
                break;
            case 'address':
                icon = 'address';
                break;
            case 'postcode':
                icon = 'postcode';
                break;
            case 'poi':
                icon = 'poi';
                break;

        }

        return `${window.location.href}/images/icons/mapbox-results/${icon}.png`;


    }


}
