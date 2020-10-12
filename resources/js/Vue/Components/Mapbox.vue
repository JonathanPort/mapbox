<template>

    <div class="mapbox">

        <div id="mapbox-canvas" class="mapbox__canvas"></div>

    </div>

</template>


<script>

    import Mapbox from 'mapbox-gl/dist/mapbox-gl';
    import 'mapbox-gl/src/css/mapbox-gl.css';
    import mapboxStyles from './../Includes/MapboxStyles';

    export default {
        data() {
            return {
                container: 'mapbox-canvas',
            }
        },
        props: {
            //
        },
        methods: {
            startMapbox() {

                Mapbox.accessToken = this.$store.getters.app.keys.mapbox;

                const Map = new Mapbox.Map({
                    container:              this.container,
                    style:                  this.style,
                    minZoom:                this.minZoom,
                    maxZoom:                this.maxZoom,
                    center:                 this.initialLocation,
                    zoom:                   this.initialZoom,
                    renderWorldCopies:      this.renderWorldCopies,
                    maxBounds:              this.maxBounds,
                });

                this.map = Map;

            },
            mapboxEvents() {

                this.map.on('load', () => {

                    // Resize because mapbox doesn't respect the containers full width and height on load
                    this.map.resize();

                });


                this.map.on('click', (e) => {

                    console.log(e);

                });

            },
            requestCurrentLocation() {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.currentLocationDeclined);
                }

            },
            setCurrentLocation(location) {

                this.currentLocation = location.coords;

                const markerElem = document.createElement('div');
                markerElem.classList.add('mapbox__curent-location-marker');

                const marker = new Mapbox.Marker(markerElem)
                    .setLngLat([this.currentLocation.longitude, this.currentLocation.latitude])
                    .addTo(this.map);

                setTimeout(() => this.$store.commit('setLoading', false), 400);

            },
            currentLocationDeclined() {

                setTimeout(() => this.$store.commit('setLoading', false), 400);

            },

        },
        computed: {

            map: {
                get() {
                    return this.$store.getters.mapbox.map;
                },
                set(map) {
                    return this.$store.commit('setMapboxMap', map);
                },
            },

            minZoom: {
                get() {
                    return this.$store.getters.mapbox.minZoom;
                },
                set(minZoom) {
                    return this.$store.commit('setMapboxMinZoom', minZoom);
                },
            },

            maxZoom: {
                get() {
                    return this.$store.getters.mapbox.maxZoom;
                },
                set(maxZoom) {
                    return this.$store.commit('setMapboxMaxZoom', maxZoom);
                },
            },

            renderWorldCopies: {
                get() {
                    return this.$store.getters.mapbox.renderWorldCopies;
                },
                set(renderWorldCopies) {
                    return this.$store.commit('setMapboxRenderWorldCopies', renderWorldCopies);
                },
            },

            maxBounds: {
                get() {
                    return this.$store.getters.mapbox.maxBounds;
                },
                set(maxBounds) {
                    return this.$store.commit('setMapboxMaxBounds', maxBounds);
                },
            },

            currentLocation: {
                get() {
                    return this.$store.getters.mapbox.currentLocation;
                },
                set(currentLocation) {
                    return this.$store.commit('setMapboxCurrentLocation', currentLocation);
                },
            },

            initialLocation: {
                get() {
                    return this.$store.getters.mapbox.initialLocation;
                },
                set(initialLocation) {
                    return this.$store.commit('setMapboxInitialLocation', initialLocation);
                },
            },

            initialZoom: {
                get() {
                    return this.$store.getters.mapbox.initialZoom;
                },
                set(initialZoom) {
                    return this.$store.commit('setMapboxInitialZoom', initialZoom);
                },
            },

            style: {
                get() {
                    return this.$store.getters.mapbox.style;
                },
                set(style) {
                    return this.$store.commit('setMapboxStyle', style);
                }
            }

        },
        watch: {
            style(style) {
                this.map.setStyle(style);
            },
        },
        filters: {
            //
        },
        created() {
            //
        },
        mounted() {

            this.startMapbox();

            this.mapboxEvents();

            this.requestCurrentLocation();

        }

    }
</script>
