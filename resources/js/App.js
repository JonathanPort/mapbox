import Vue from 'vue';
import {store} from './Vue/store';
import Start from './Vue/Start.vue';
import Loader from './Vue/Components/Loader.vue';
import FatalError from './Vue/Components/FatalError.vue';

require('./Vue/globals');

// Require used components
Vue.component('app-start', Start);
Vue.component('loader', Loader);
Vue.component('fatal-error', FatalError);

// Global event bus
Vue.prototype.$eventHub = new Vue();

// Init
window.App = new Vue({
    store,
    el: '#app-start'
});
