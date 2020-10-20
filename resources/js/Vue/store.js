import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios';
import Lockr from 'lockr';
import mapboxStyles from './Includes/MapboxStyles';

Vue.use(Vuex);

const startEndpoint = window.location.origin + '/api/mapbox-start';

const LocalStateStorage = () => {
    return Lockr.get('user_mapbox_state');
}

const UpdateLocalStateStorage = (data) => {
    return Lockr.set('user_mapbox_state', data);
}

export const store = new Vuex.Store({

    // Application State
    state: {
        app: {},
        mapbox: {
            map: false,
            style: false,
            minZoom: 2,
            maxZoom: 8,
            zoom: 4.00,
            renderWorldCopies: false,
            maxBounds: [
                [-178.87718014230165, -84.97472632065279], // Southwest coordinates
                [178.58152105004024, 84.92832115514318] // Northeast coordinates
            ],
            initialLocation: [
                -2.195051236058873,
                53.28857482514107,
            ],
            currentLocation: false,
        },
        loading: true,
        loading_message: 'Loading application...',
        lists: {},
        appShouldStart: false,
        fatalError: false,
    },

    // Getters
    getters: {
        app:                    state => state.app,
        mapbox:                 state => state.mapbox,
        getLoadingState:        state => state.loading,
        getLoadingMessage:      state => state.loading_message,
        getLists:               state => state.lists,
        appHasFatalError:       state => state.fatalError,
        appShouldStart:         state => state.appShouldStart,
    },

    // Mutations - setters
    mutations: {
        setLoading(state, loading) {
            state.loading = loading ? true : false;
        },
        setAppData(state, data) {
            state.app = data;
        },
        setFatalError(state, toggle) {
            state.fatalError = toggle ? true : false;
        },
        setAppShouldState(state, toggle) {
            state.appShouldStart = toggle ? true : false;
        },
        setMapboxMap(state, data) {
            state.mapbox.map = data;
        },
        setMapboxMinZoom(state, data) {
            state.mapbox.minZoom = data;
        },
        setMapboxMaxZoom(state, data) {
            state.mapbox.maxZoom = data;
        },
        setMapboxZoom(state, data) {

            state.mapbox.zoom = data;

            let storage = LocalStateStorage();

            if (storage && storage.zoom) {
                storage.zoom = data;
                UpdateLocalStateStorage(storage);
            }

        },
        setMapboxRenderWorldCopies(state, data) {
            state.mapbox.renderWorldCopies = data;
        },
        setMapboxMaxBounds(state, data) {
            state.mapbox.maxBounds = data;
        },
        setMapboxCurrentLocation(state, data) {
            state.mapbox.currentLocation = data;
        },
        setMapboxInitialLocation(state, data) {
            state.mapbox.initialLocation = data;
        },
        setMapboxStyle(state, data) {

            state.mapbox.style = data;

            let storage = LocalStateStorage();

            if (storage) {
                storage.style = data;
                UpdateLocalStateStorage(storage);
            }

        },
        setMapboxInitialStyle(state) {

            let style;
            let storage = LocalStateStorage();

            if (storage && storage.style) {

                style = storage.style;

            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    style = mapboxStyles.le_shine_dark.style;
                } else {
                    style = mapboxStyles.le_shine.style;
                }
            }

            state.mapbox.style = style;

        },
        setMapboxInitialZoom(state) {

            let zoom;
            const storage = LocalStateStorage();

            if (storage && storage.zoom) {
                zoom = storage.zoom;
            } else {
                zoom = state.mapbox.zoom;
            }

            state.mapbox.zoom = zoom;

        },
    },

    // Actions
    actions: {
        initApp(state, callback) {

            Axios.get(startEndpoint)
            .then(response => {

                this.commit('setAppData', response.data);

                this.commit('setMapboxInitialStyle');
                this.commit('setMapboxInitialZoom');

                if (! Lockr.get('user_mapbox_state')) Lockr.set('user_mapbox_state', {
                    style: this.getters.mapbox.style,
                    zoom: this.getters.mapbox.zoom,
                    initialLocation: [
                        -2.195051236058873,
                        53.28857482514107,
                    ],
                    currentLocation: false,
                });

                callback();

            })
            .catch(error => this.commit('setFatalError', true));

        },
    },

});
