import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({

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
        initApp(state) {

            this.commit('setLoading', true);

            // Axios.get(window.crm.DASHBOARD_INIT_URL)
            // .then(response => {

            //     // this.commit('mutationFunction', response.data);
            //     setTimeout(() => this.commit('setLoading', false), 400);

            // });

        },
    }

});
