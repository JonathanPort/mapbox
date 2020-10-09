import Vue from 'vue';
import axios from 'axios';

Vue.directive('click-outside', {

    bind: function (el, binding, vnode) {

        el.clickOutsideEvent = function (event) {

            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }

        };

        document.body.addEventListener('click', el.clickOutsideEvent);

    },

    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});

// Force ajax header so Laravel detects it correctly
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
