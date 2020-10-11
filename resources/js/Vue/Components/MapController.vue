<template>

    <div class="map-controller">

        <div class="map-controller__controls">

            <div class="map-controller__control">

                <input class="map-search__input" type="text" placeholder="search" v-model="searchQuery" @input="onSearch">

            </div>

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

        </div>

        <div class="map-search" v-if="searchResults.length">

            <div class="map-search__results">

                <div class="map-search__result" v-for="result in searchResults" :key="result.id">

                    <div class="map-search__result-inner" @click="onResultClick(result)">

                        <div class="map-search__result-icon">
                            <img :src="result.icon" alt="">
                        </div>

                        <div class="map-search__result-text">

                            <h3 class="map-search__result-heading">{{ result.shortText }}</h3>

                            <h4 class="map-search__result-subheading">{{ result.fullText }}</h4>

                        </div>

                    </div>

                </div>

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

                    const Service = this.ForwardGeocodingService;

                    this.searchResults = [];

                    if (this.searchQuery) {

                        Service.search(this.searchQuery, results => this.searchResults = results);

                    }

                }, this.searchTimerWaitTime);

            },
            onResultClick(result) {

                console.log(result)

            }
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
