import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({

    // Start Endpoint
    startEndpoint: window.location.origin + '/api/mapbox-start',

    // Application State
    state: {
        loading: true,
        loading_message: 'Loading application...',
        lists: {},
    },

    // Getters
    getters: {
        getLoadingState:        state => state.loading,
        getLoadingMessage:      state => state.loading_message,
        getLists:               state => state.lists,
    },

    // Mutations - setters
    mutations: {
        setLoading(state, loading) {
            state.loading = loading ? true : false;
        },
    },

    // Actions - listeners?
    actions: {
        initApp(state, callback) {
            // console.log('ere');
            this.commit('setLoading', true);

            Axios.get(this.startEndpoint)
            .then(response => {

                window.AppData = response.data;

                callback();

                // this.commit('mutationFunction', response.data);
                // setTimeout(() => this.commit('setLoading', false), 400);

            });

        },
    }

});
