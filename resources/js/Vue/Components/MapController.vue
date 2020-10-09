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

        </div>

    </div>

</template>


<script>

    import mapboxStyles from './../Includes/MapboxStyles';

    export default {
        data() {
            return {
                mapboxStyles: mapboxStyles,
                selectedStyle: mapboxStyles.satellite.style,
            }
        },
        props: {
            //
        },
        methods: {
            onStyleSelect() {

                this.$eventHub.$emit('mapbox::change-style', this.selectedStyle);

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
