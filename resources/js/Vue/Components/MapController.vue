<template>

    <div class="map-controller">

        <div class="map-controller__controls">

            <div class="map-controller__control">
                <select v-model="selectedStyle" @change="onStyleSelect">

                    <option v-for="option in mapboxStyles"
                            :key="option.style"
                            :value="option.style"
                            :selected="option.style === selectedStyle"
                    >
                        {{ option.label }}
                    </option>

                </select>
            </div>

            <div class="map-controller__control">

                <input type="text" placeholder="search" v-model="searchQuery" @input="onSearch">

            </div>

        </div>

    </div>

</template>


<script>

    import MapboxStyles from './../Includes/MapboxStyles';
    import ForwardGeocodingService from './../Includes/ForwardGeocodingService';

    export default {
        data() {
            return {
                mapboxStyles: MapboxStyles,
                selectedStyle: MapboxStyles.satellite.style,
                searchQuery: '',
                searchResults: [],
                ForwardGeocodingService: new ForwardGeocodingService(),
                searchTimer: false,
                searchTimerWaitTime: 400,
            }
        },
        props: {
            //
        },
        methods: {
            onStyleSelect() {

                this.$eventHub.$emit('mapbox::change-style', this.selectedStyle);

            },
            onSearch() {

                clearTimeout(this.searchTimer);

                return this.searchTimer = setTimeout(() => {

                    const service = this.ForwardGeocodingService;

                    this.searchResults = [];

                    if (this.searchQuery) {

                        service.search(this.searchQuery, results => {

                            console.log(results);

                        });

                    }

                }, this.searchTimerWaitTime);

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
            //
        }

    }
</script>
