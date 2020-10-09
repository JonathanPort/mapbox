import Vue from 'vue';
import {store} from './Vue/store';
import Start from './Vue/Start.vue';
import Loader from './Vue/Components/Loader.vue';

require('./Vue/globals');

// Require used components
Vue.component('app-start', Start);
Vue.component('loader', Loader);

// Global event bus
Vue.prototype.$eventHub = new Vue();

// Init
window.App = new Vue({
    store,
    el: '#app-start'
});
