<template>

    <div class="app-wrapper">

        <mapbox></mapbox>
        <map-controller></map-controller>

        <!-- Loading Spinner -->
        <loader :loading="loading()" :message="this.$store.getters.getLoadingMessage"></loader>

    </div>

</template>


<script>

    import Axios from 'axios';
    import Mapbox from './Components/Mapbox.vue';
    import MapController from './Components/MapController.vue';

    export default {
        components: {
            Mapbox,
            MapController,
        },
        data() {
            return {
                //
            }
        },
        props: {
            //
        },
        methods: {
            loading() {
                return this.$store.getters.getLoadingState;
            },
        },
        computed: {
            //
        },
        filters: {
            //
        },
        created() {
            //
        },
        mounted() {
            this.$store.dispatch('initApp');
        }

    }
</script>
