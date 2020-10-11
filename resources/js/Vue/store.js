import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const startEndpoint = window.location.origin + '/api/mapbox-start';

export const store = new Vuex.Store({

    // Application State
    state: {
        app: {},
        loading: true,
        loading_message: 'Loading application...',
        lists: {},
        appShouldStart: false,
        fatalError: false,
    },

    // Getters
    getters: {
        app:                    state => state.app,
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
    },

    // Actions - listeners?
    actions: {
        initApp(state, callback) {

            Axios.get(startEndpoint)
            .then(response => {

                this.commit('setAppData', response.data);

                callback();

            })
            .catch(error => this.commit('setFatalError', true));

        },
    }

});
