<template>

    <div class="app-wrapper">

        <div v-if="shouldStart">

            <mapbox></mapbox>

            <map-controller></map-controller>

        </div>

        <!-- Loading Spinner -->
        <loader :loading="this.$store.getters.getLoadingState"
                :message="this.$store.getters.getLoadingMessage"></loader>

        <!-- Fatal Error Screen -->
        <fatal-error v-if="showFatal"></fatal-error>

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
                shouldStart: false,
            }
        },
        props: {
            //
        },
        methods: {
            //
        },
        computed: {
            showFatal() {
                return this.$store.getters.appHasFatalError ? true : false;
            },
        },
        filters: {
            //
        },
        created() {
            //
        },
        mounted() {

            this.$store.dispatch('initApp', () => {

                this.shouldStart = true;

            });

        }

    }
</script>
