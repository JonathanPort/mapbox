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
                map: false,
                container: 'mapbox-canvas',
                minZoom: 2,
                maxZoom: 8,
                maxPitch: 30,
                renderWorldCopies: false,
                maxBounds: [
                    [-178.87718014230165, -84.97472632065279], // Southwest coordinates
                    [178.58152105004024, 84.92832115514318] // Northeast coordinates
                ],
                currentLocation: false,
            }
        },
        props: {
            //
        },
        methods: {
            startMapbox() {

                Mapbox.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5wb3J0IiwiYSI6ImNrZnR5aWk4cDB3ZjEycHBkbnZnMHhnNHQifQ.PidFMxwHKmlO8kHgcd67Sw';

                const Map = new Mapbox.Map({
                    container: this.container,
                    style: this.style,
                    minZoom: this.minZoom,
                    maxZoom: this.maxZoom,
                    maxPitch: this.maxPitch,
                    center: this.startLocation,
                    zoom: this.startZoom,
                    renderWorldCopies: this.renderWorldCopies,
                    maxBounds: this.maxBounds,
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

                this.$eventHub.$on('mapbox::change-style', (style) => {

                    this.style = style;

                    this.map.setStyle(this.style);

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

            startLocation() {
                return [
                    -2.195051236058873,
                    53.28857482514107,
                ];
            },

            startZoom() {
                return 4;
            },

            style() {

                let style;

                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    style = mapboxStyles.dark.style;
                } else {
                    style = mapboxStyles.light.style;
                }

                return style;

            }

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
